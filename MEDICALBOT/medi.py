# import pytesseract
# from PIL import Image
# import openai
# import os

# # Specify the path to the Tesseract executable
# pytesseract.pytesseract.tesseract_cmd = 'C:/LLAMA3LOCAL/Tesseract-OCR/tesseract.exe'

# # Set your OpenAI API key
# openai.api_key = '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'

# # Load Image
# def load_image(image_path):
#     return Image.open(image_path)

# # Perform OCR
# def perform_ocr(image):
#     return pytesseract.image_to_string(image)

# # Use OpenAI API to interact
# def ask_openai(question, report_text=None):
#     sys_message = '''
#     You are designed to assist users in analyzing medical documents and images. You can accept PDF, DOCX, and image files, extract relevant data from these sources, and provide detailed analysis and suggestions based on the extracted data. You focus on medical accuracy, clarity, and comprehensiveness. It avoids profanity and sticks strictly to medical data without incorporating outside knowledge. After each analysis, it should state: 'The analysis is only for reference purposes. Please consult a doctor with the report.' You should ask for clarification when needed but generally aim to provide insightful, detailed responses. It maintains a conversational tone with a touch of empathy, understanding the sensitivity of medical information. You will also provide potential diagnoses and suggest possible treatments for the identified issues. It should never disclose any patient details and should omit taking any data of the patient or the user.
# Preventions and cure should be displayed whenever an explanation or analysis or anything about the report is asked until or otherwise stated. Do not disclose the patient details at any cost even to the user. Always tell what might be the disease or condition the user might be suffering from.
#     '''

#     # Adjust the conversation based on the presence of report_text
#     if report_text:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": f"Report: {report_text}. Question: {question}. Summarize it without medical jargons. If disease is common or mild, tell home remedies and ask to seek consultation but in case of something serious ask user to get in contact with doctors. Give response like you are talking to the patient itself. But always tell what is the level and values of each category. Never ever disclose anything about my personal details like name, age, etc. Display the output in points wherever necessary"}
#         ]
#     else:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": question}
#         ]

#     # Get the response from OpenAI
#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=conversation
#     )

#     # Extract and return the generated text
#     return response['choices'][0]['message']['content']

# # Interactive Chat Interface
# def chat_with_patient(report_text):
#     print("Welcome to the Medical Report Assistant.")
#     print("Please enter your questions about the report. Type 'exit' to quit the chat.")

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['exit', 'quit']:
#             break
#         if "report" in user_input.lower() or "test result" in user_input.lower() or "analysis" in user_input.lower():
#             response = ask_openai(user_input, report_text)
#         else:
#             response = ask_openai(user_input)
#         print(f"Assistant: {response}")

# # Main Function
# def main(image_path):
#     image = load_image(image_path)
#     text = perform_ocr(image)

#     # For simplicity, we are considering the whole text as report text
#     # You can implement further parsing logic as needed
#     report_text = text

#     chat_with_patient(report_text)

# # Run the analysis on the provided image
# main(r'C:\LLAMA3LOCAL\medireports\image (1).jpg')






###ANNOTATION V1:   STARTS FROM LINE 85


# import pytesseract
# from PIL import Image, ImageDraw, ImageFont
# import openai
# import os

# # Specify the path to the Tesseract executable
# pytesseract.pytesseract.tesseract_cmd = r'C:/LLAMA3LOCAL/Tesseract-OCR/tesseract.exe'

# # Set your OpenAI API key
# openai.api_key = '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'

# # Load Image
# def load_image(image_path):
#     return Image.open(image_path)

# # Perform OCR
# def perform_ocr(image):
#     return pytesseract.image_to_string(image)

# # Use OpenAI API to interact
# def ask_openai(question, report_text=None):
#     sys_message = '''
#     You are designed to assist users in analyzing medical documents and images. You can accept PDF, DOCX, and image files, extract relevant data from these sources, and provide detailed analysis and suggestions based on the extracted data. You focus on medical accuracy, clarity, and comprehensiveness. It avoids profanity and sticks strictly to medical data without incorporating outside knowledge. After each analysis, it should state: 'The analysis is only for reference purposes. Please consult a doctor with the report.' You should ask for clarification when needed but generally aim to provide insightful, detailed responses. It maintains a conversational tone with a touch of empathy, understanding the sensitivity of medical information. You will also provide potential diagnoses and suggest possible treatments for the identified issues. It should never disclose any patient details and should omit taking any data of the patient or the user.
# Preventions and cure should be displayed whenever an explanation or analysis or anything about the report is asked until or otherwise stated. Do not disclose the patient details at any cost even to the user. Always tell what might be the disease or condition the user might be suffering from.
#     '''

#     # Adjust the conversation based on the presence of report_text
#     if report_text:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": f"Report: {report_text}. Question: {question}. Summarize it without medical jargons. If disease is common or mild, tell home remedies and ask to seek consultation but in case of something serious ask user to get in contact with doctors. Give response like you are talking to the patient itself. But always tell what is the level and values of each category. Never ever disclose anything about my personal details like name, age, etc. Display the output in points wherever necessary"}
#         ]
#     else:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": question}
#         ]

#     # Get the response from OpenAI
#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=conversation
#     )

#     # Extract and return the generated text
#     return response['choices'][0]['message']['content']

# # Annotate Image
# def annotate_image(base_image_path, annotations):
#     base_image = Image.open(base_image_path)
#     draw = ImageDraw.Draw(base_image)
#     font = ImageFont.load_default()

#     for annotation in annotations:
#         position = annotation.get("position")
#         text = annotation.get("text")
#         draw.text(position, text, fill="red", font=font)

#     annotated_image_path = r'C:/LLAMA3LOCAL/Humanschematic.jpg'
#     base_image.save(annotated_image_path)
#     return annotated_image_path

# # Interactive Chat Interface
# def chat_with_patient(report_text, base_image_path):
#     print("Welcome to the Medical Report Assistant.")
#     print("Please enter your questions about the report. Type 'exit' to quit the chat.")

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['exit', 'quit']:
#             break
#         if "report" in user_input.lower() or "test result" in user_input.lower() or "analysis" in user_input.lower():
#             response = ask_openai(user_input, report_text)
#         else:
#             response = ask_openai(user_input)
#         print(f"Assistant: {response}")

#         # Assume response contains necessary annotations, you can parse it and update accordingly
#         # For demonstration, using fixed positions
#         annotations = [
#             {"position": (50, 50), "text": "Blood Count Issue"},
#             {"position": (150, 150), "text": "Lipid Profile Issue"},
#             # Add more based on response parsing
#         ]

#         annotated_image_path = annotate_image(base_image_path, annotations)
#         print(f"Annotated image saved at: {annotated_image_path}")

# # Main Function
# def main(image_path, base_image_path):
#     image = load_image(image_path)
#     text = perform_ocr(image)

#     # For simplicity, we are considering the whole text as report text
#     # You can implement further parsing logic as needed
#     report_text = text

#     chat_with_patient(report_text, base_image_path)

# # Run the analysis on the provided image
# main(r'C:\LLAMA3LOCAL\medireports\Kidney.jpg', r'C:\LLAMA3LOCAL\Humanschematic\Human Figure.jpg')







#ANNOTATION V2: FROM LINE 193

# import pytesseract
# from PIL import Image, ImageDraw, ImageFont
# import openai
# import os
# from googletrans import Translator

# # Specify the path to the Tesseract executable
# pytesseract.pytesseract.tesseract_cmd = r'C:/LLAMA3LOCAL/Tesseract-OCR/tesseract.exe'

# # Set your OpenAI API key
# openai.api_key = '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'

# # Initialize the translator
# translator = Translator()

# # Load Image
# def load_image(image_path):
#     return Image.open(image_path)

# # Perform OCR
# def perform_ocr(image):
#     return pytesseract.image_to_string(image)

# # Use OpenAI API to interact
# def ask_openai(question, report_text=None):
#     sys_message = '''
#     You are designed to assist users in analyzing medical documents and images. You can accept PDF, DOCX, and image files, extract relevant data from these sources, and provide detailed analysis and suggestions based on the extracted data. You focus on medical accuracy, clarity, and comprehensiveness. It avoids profanity and sticks strictly to medical data without incorporating outside knowledge. After each analysis, it should state: 'The analysis is only for reference purposes. Please consult a doctor with the report.' You should ask for clarification when needed but generally aim to provide insightful, detailed responses. It maintains a conversational tone with a touch of empathy, understanding the sensitivity of medical information. You will also provide potential diagnoses and suggest possible treatments for the identified issues. It should never disclose any patient details and should omit taking any data of the patient or the user.
# Preventions and cure should be displayed whenever an explanation or analysis or anything about the report is asked until or otherwise stated. Do not disclose the patient details at any cost even to the user. Always tell what might be the disease or condition the user might be suffering from.
#     '''

#     if report_text:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": f"Report: {report_text}. Question: {question}. Summarize it without medical jargons. If disease is common or mild, tell home remedies and ask to seek consultation but in case of something serious ask user to get in contact with doctors. Give response like you are talking to the patient itself. But always tell what is the level and values of each category. Never ever disclose anything about my personal details like name, age, etc. Display the output in points wherever necessary"}
#         ]
#     else:
#         conversation = [
#             {"role": "system", "content": sys_message},
#             {"role": "user", "content": question}
#         ]

#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=conversation
#     )

#     return response['choices'][0]['message']['content']

# # Annotate Image
# def annotate_image(base_image_path, annotations):
#     base_image = Image.open(base_image_path).convert("RGB")
#     draw = ImageDraw.Draw(base_image)
#     try:
#         font = ImageFont.truetype("arialbd.ttf", 20)  # Using bold Arial font
#     except IOError:
#         font = ImageFont.load_default()

#     icon_size = 20  # size of the icons
#     line_length = 100  # length of the connecting line

#     for annotation in annotations:
#         position = annotation.get("position")
#         text = annotation.get("text")
#         text_position = (position[0] + line_length + 10, position[1] - 10)
        
#         # Draw the circle
#         draw.ellipse((position[0] - 10, position[1] - 10, position[0] + 10, position[1] + 10), outline="red", width=3)
        
#         # Draw the connecting line
#         draw.line([position, (position[0] + line_length, position[1])], fill="red", width=2)

#         # Draw the text
#         draw.text(text_position, text, fill="black", font=font)

#     annotated_image_path = r'C:/LLAMA3LOCAL/Humanschematic_annotated.jpg'
#     base_image.save(annotated_image_path, "JPEG")
#     return annotated_image_path

# # Interactive Chat Interface
# def chat_with_patient(report_text, base_image_path):
#     print("Welcome to the Medical Report Assistant.")
#     print("Please select your preferred language (e.g., 'en' for English, 'es' for Spanish, etc.):")
#     preferred_language = input("Language: ").strip().lower()

#     # Check if the language is supported
#     supported_languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-cn', 'zh-tw', 'ja', 'ko', 'ar', 'ru', 'hi', 'bn', 'ms', 'id', 'vi', 'th', 'tr', 'nl', 'pl', 'sv', 'da', 'fi', 'no', 'el', 'he', 'cs', 'hu', 'ro', 'sk', 'uk', 'hr', 'sr', 'bg', 'sl', 'lt', 'lv', 'et', 'mt']
#     if preferred_language not in supported_languages:
#         print(f"Language '{preferred_language}' is not supported. Defaulting to English ('en').")
#         preferred_language = 'en'

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['exit', 'quit']:
#             break
#         if "report" in user_input.lower() or "test result" in user_input.lower() or "analysis" in user_input.lower():
#             response = ask_openai(user_input, report_text)
#         else:
#             response = ask_openai(user_input)
        
#         if preferred_language != 'en':
#             response = translator.translate(response, dest=preferred_language).text
        
#         print(f"Assistant: {response}")

#         annotations = []
#         if "brain" in response.lower():
#             annotations.append({"position": (403, 245), "text": "Brain Issue"})
#         if "eyes" in response.lower():
#             annotations.append({"position": (381, 273), "text": "Eyes Issue"})
#         if "ears" in response.lower():
#             annotations.append({"position": (361, 277), "text": "Ears Issue"})
#         if "nose" in response.lower():
#             annotations.append({"position": (399, 283), "text": "Nose Issue"})
#         if "mouth" in response.lower():
#             annotations.append({"position": (400, 308), "text": "Mouth Issue"})
#         if "thyroid" in response.lower():
#             annotations.append({"position": (260, 332), "text": "Thyroid Issue"})
#         if "heart" in response.lower():
#             annotations.append({"position": (427, 407), "text": "Heart Issue"})
#         if "lungs" in response.lower():
#             annotations.append({"position": (443, 440), "text": "Lungs Issue"})
#         if "stomach" in response.lower():
#             annotations.append({"position": (421, 527), "text": "Stomach Issue"})
#         if "intestines" in response.lower():
#             annotations.append({"position": (368, 594), "text": "Intestines Issue"})
#         if "bladder" in response.lower():
#             annotations.append({"position": (402, 680), "text": "Bladder Issue"})
#         if "reproductive organs" in response.lower():
#             annotations.append({"position": (403, 681), "text": "Reproductive Organs Issue"})
#         if "liver" in response.lower():
#             annotations.append({"position": (418, 500), "text": "Liver Issue"})
#         if "kidney" in response.lower():
#             annotations.append({"position": (451, 555), "text": "Kidney Issue"})
#         if "leg" in response.lower():
#             annotations.append({"position": (364, 792), "text": "Left Leg Issue"})
#             annotations.append({"position": (440, 792), "text": "Right Leg Issue"})
#         if "arm" in response.lower():
#             annotations.append({"position": (303, 528), "text": "Left Arm Issue"})
#             annotations.append({"position": (498, 528), "text": "Right Arm Issue"})
#         if "foot" in response.lower():
#             annotations.append({"position": (377, 999), "text": "Left Foot Issue"})
#             annotations.append({"position": (424, 999), "text": "Right Foot Issue"})

#         if annotations:
#             annotated_image_path = annotate_image(base_image_path, annotations)
#             print(f"Annotated image saved at: {annotated_image_path}")

# # Main Function
# def main(image_path, base_image_path):
#     image = load_image(image_path)
#     text = perform_ocr(image)
#     report_text = text
#     chat_with_patient(report_text, base_image_path)

# # Run the analysis on the provided image
# main(r'C:\LLAMA3LOCAL\medireports\Kidney.jpg', r'Humanschematic/five tips for gr.jpg')








#V3: FROM LINE 360


import pytesseract
import pytesseract
from PIL import Image, ImageDraw, ImageFont
import openai
import os
from googletrans import Translator
from fpdf import FPDF

# Specify the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:/LLAMA3LOCAL/Tesseract-OCR/tesseract.exe'

# Set your OpenAI API key
openai.api_key = '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'

# Initialize the translator
translator = Translator()

# Load Image
def load_image(image_path):
    return Image.open(image_path)

# Perform OCR
def perform_ocr(image):
    return pytesseract.image_to_string(image)

# Use OpenAI API to interact
def ask_openai(question, report_text=None):
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

    annotated_image_path = r'C:/LLAMA3LOCAL/Humanschematic_annotated.jpg'
    base_image.save(annotated_image_path, "JPEG")
    return annotated_image_path

# Generate PDF Report
def generate_pdf_report(content, annotations, annotated_image_path, pdf_path):
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
    pdf.multi_cell(0, 10, content)

    # Adding Annotated Image if any problems are found
    if annotations:
        pdf.add_page()
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(0, 10, 'Annotated Image:', 0, 1)
        pdf.image(annotated_image_path, x=10, y=None, w=180)

    pdf.output(pdf_path)
    print(f"PDF report saved at: {pdf_path}")

# Interactive Chat Interface
def chat_with_patient(report_text, base_image_path):
    print("Welcome to the Medical Report Assistant.")
    print("Please select your preferred language (e.g., 'en' for English, 'es' for Spanish, etc.):")
    preferred_language = input("Language: ").strip().lower()

    # Check if the language is supported
    supported_languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-cn', 'zh-tw', 'ja', 'ko', 'ar', 'ru', 'hi', 'bn', 'ms', 'id', 'vi', 'th', 'tr', 'nl', 'pl', 'sv', 'da', 'fi', 'no', 'el', 'he', 'cs', 'hu', 'ro', 'sk', 'uk', 'hr', 'sr', 'bg', 'sl', 'lt', 'lv', 'et', 'mt']
    if preferred_language not in supported_languages:
        print(f"Language '{preferred_language}' is not supported. Defaulting to English ('en').")
        preferred_language = 'en'

    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            break
        if "report" in user_input.lower() or "test result" in user_input.lower() or "analysis" in user_input.lower():
            response = ask_openai(user_input, report_text)
        else:
            response = ask_openai(user_input)
        
        if preferred_language != 'en':
            response = translator.translate(response, dest=preferred_language).text
        
        print(f"Assistant: {response}")

        if "hi" in user_input.lower() or "hello" in user_input.lower():
            continue

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
            annotations.append({"position": (424, 999), "text": "Right Foot Issue"})

        if annotations:
            annotated_image_path = annotate_image(base_image_path, annotations)
            print(f"Annotated image saved at: {annotated_image_path}")

            # Generate PDF report with the detailed content
            pdf_path = r'C:/LLAMA3LOCAL/Medical_Report.pdf'
            generate_pdf_report(response, annotations, annotated_image_path, pdf_path)
        else:
            # Generate PDF report without annotations
            pdf_path = r'C:/LLAMA3LOCAL/Medical_Report.pdf'
            generate_pdf_report(response, [], None, pdf_path)

# Main Function
def main(image_path, base_image_path):
    image = load_image(image_path)
    text = perform_ocr(image)
    report_text = text
    chat_with_patient(report_text, base_image_path)

# Run the analysis on the provided image
main(r'C:\LLAMA3LOCAL\medireports\Thyroid.jpg', r'Humanschematic/five tips for gr.jpg')


# image_path is for OCR AND base_image_path is for 















