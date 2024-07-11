import pytesseract
from PIL import Image, ImageDraw, ImageFont
import openai
import os
from googletrans import Translator
from fpdf import FPDF
from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Specify the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = R'"D:\IDP\tesseract\tesseract.exe"'

# Set your OpenAI API key
openai.api_key = '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'

# Initialize the translator
translator = Translator()

# Ensure necessary directories exist
UPLOAD_FOLDER = 'uploads'
REPORT_FOLDER = 'reports'
ANNOTATED_FOLDER = 'annotated'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REPORT_FOLDER, exist_ok=True)
os.makedirs(ANNOTATED_FOLDER, exist_ok=True)

# Load Image
def load_image(image_path):
    print(f"Loading image from {image_path}")
    return Image.open(image_path)

# Perform OCR
def perform_ocr(image):
    print("Performing OCR on the image")
    return pytesseract.image_to_string(image)

# Use OpenAI API to interact
def ask_openai(question, report_text=None):
    print("Asking OpenAI for a response")

    sys_message = '''
    You are designed to assist users in analyzing medical documents and images. You can accept PDF, DOCX, and image files, extract relevant data from these sources, and provide detailed analysis and suggestions based on the extracted data. You focus on medical accuracy, clarity, and comprehensiveness. It avoids profanity and sticks strictly to medical data without incorporating outside knowledge. After each analysis, it should state: 'The analysis is only for reference purposes. Please consult a doctor with the report.' You should ask for clarification when needed but generally aim to provide insightful, detailed responses. It maintains a conversational tone with a touch of empathy, understanding the sensitivity of medical information. You will also provide potential diagnoses and suggest possible treatments for the identified issues. It should never disclose any patient details and should omit taking any data of the patient or the user.
    '''

    if report_text:
        conversation = [
            {"role": "system", "content": sys_message},
            {"role": "user", "content": f"Report: {report_text}. Question: {question}. Summarize it without medical jargons. If disease is common or mild, tell home remedies and ask to seek consultation but in case of something serious ask user to get in contact with doctors. Give response like you are talking to the patient itself. But always tell what is the level and values of each category. Never ever disclose anything about my personal details like name, age, etc. Display the output in points wherever necessary"}
        ]
    else:
        conversation = [
            {"role": "system", "content": sys_message},
            {"role": "user", "content": question}
        ]

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=conversation
    )

    return response['choices'][0]['message']['content']

# Annotate Image
def annotate_image(base_image_path, annotations):
    print("Annotating image")
    base_image = Image.open(base_image_path).convert("RGB")
    draw = ImageDraw.Draw(base_image)

    try:
        font = ImageFont.truetype("arialbd.ttf", 20)  # Using bold Arial font
    except IOError:
        font = ImageFont.load_default()

    icon_size = 20  # size of the icons
    line_length = 100  # length of the connecting line

    for annotation in annotations:
        position = annotation.get("position")
        text = annotation.get("text")
        text_position = (position[0] + line_length + 10, position[1] - 10)
        # Draw the circle
        draw.ellipse((position[0] - 10, position[1] - 10, position[0] + 10, position[1] + 10), outline="red", width=3)
        # Draw the connecting line
        draw.line([position, (position[0] + line_length, position[1])], fill="red", width=2)
        # Draw the text
        draw.text(text_position, text, fill="black", font=font)

    annotated_image_path = os.path.join(ANNOTATED_FOLDER, 'Humanschematic_annotated.jpg')
    base_image.save(annotated_image_path, "JPEG")
    return annotated_image_path

# Generate PDF Report
def generate_pdf_report(content, annotations, annotated_image_path, pdf_path):
    print("Generating PDF report")
    pdf = FPDF()
    pdf.add_page()

    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.set_text_color(0, 0, 128)
    pdf.cell(0, 10, 'Medical Report', 0, 1, 'C')

    # Problems Section
    pdf.set_font("Arial", 'B', 14)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 10, 'Problems:', 0, 1)
    pdf.set_font("Arial", '', 12)

    for annotation in annotations:
        pdf.multi_cell(0, 10, f"- {annotation['text']}")

    # Summary Section
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(0, 10, 'Summary:', 0, 1)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 10, content.encode('latin-1', 'replace').decode('latin-1'))

    # Adding Annotated Image if any problems are found
    if annotations:
        pdf.add_page()
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(0, 10, 'Annotated Image:', 0, 1)
        pdf.image(annotated_image_path, x=10, y=None, w=180)

    pdf.output(pdf_path)

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    print("Received request to analyze report")
    
    question = request.form.get('question', '')
    file = request.files.get('file')

    if file:
        image_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(image_path)
        print(f"Saved uploaded file to {image_path}")
        
        image = load_image(image_path)
        text = perform_ocr(image)
        response = ask_openai(question, text)
    else:
        data = request.get_json()
        question = data['question']
        response = ask_openai(question)

    print(f"OpenAI response: {response}")

    annotations = []

    if "brain" in response.lower():
        annotations.append({"position": (403, 245), "text": "Brain Issue"})
    if "eyes" in response.lower():
        annotations.append({"position": (381, 273), "text": "Eyes Issue"})
    if "ears" in response.lower():
        annotations.append({"position": (361, 277), "text": "Ears Issue"})
    if "nose" in response.lower():
        annotations.append({"position": (399, 283), "text": "Nose Issue"})
    if "mouth" in response.lower():
        annotations.append({"position": (400, 308), "text": "Mouth Issue"})
    if "thyroid" in response.lower():
        annotations.append({"position": (260, 332), "text": "Thyroid Issue"})
    if "heart" in response.lower():
        annotations.append({"position": (427, 407), "text": "Heart Issue"})
    if "lungs" in response.lower():
        annotations.append({"position": (443, 440), "text": "Lungs Issue"})
    if "stomach" in response.lower():
        annotations.append({"position": (421, 527), "text": "Stomach Issue"})
    if "intestines" in response.lower():
        annotations.append({"position": (368, 594), "text": "Intestines Issue"})
    if "bladder" in response.lower():
        annotations.append({"position": (402, 680), "text": "Bladder Issue"})
    if "reproductive organs" in response.lower():
        annotations.append({"position": (403, 681), "text": "Reproductive Organs Issue"})
    if "liver" in response.lower():
        annotations.append({"position": (418, 500), "text": "Liver Issue"})
    if "kidney" in response.lower():
        annotations.append({"position": (451, 555), "text": "Kidney Issue"})
    if "leg" in response.lower():
        annotations.append({"position": (364, 792), "text": "Left Leg Issue"})
        annotations.append({"position": (440, 792), "text": "Right Leg Issue"})
    if "arm" in response.lower():
        annotations.append({"position": (303, 528), "text": "Left Arm Issue"})
        annotations.append({"position": (498, 528), "text": "Right Arm Issue"})
    if "foot" in response.lower():
        annotations.append({"position": (377, 999), "text": "Left Foot Issue"})
        annotations.append({"position": (452, 999), "text": "Right Foot Issue"})

    annotated_image_path = None
    if annotations:
        annotated_image_path = annotate_image("Humanschematic.jpg", annotations)
        print(f"Annotated image saved to {annotated_image_path}")

    pdf_path = os.path.join(REPORT_FOLDER, 'medical_report.pdf')
    generate_pdf_report(response, annotations, annotated_image_path, pdf_path)
    print(f"PDF report generated at {pdf_path}")

    return jsonify({"message": response, "file_path": pdf_path})

@app.route('/download', methods=['GET'])
def download():
    file_path = request.args.get('file_path')
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
