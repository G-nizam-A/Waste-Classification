from keras.models import load_model
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input
import numpy as np
import os

# model = load_model('models/model.h5')
# model = load_model('models/model.h5')
model = load_model('models/modified_resnet50_model.h5')
# output_class = ["battery", "glass", "metal","organic", "paper", "plastic"]

output_class = ['battery',
 'biological',
 'cardboard',
 'clothes',
 'glass',
 'metal',
 'paper',
 'plastic',
 'shoes',
 'trash']

# output_class = ["brown_glass","plastic", "battery", "trash","white_glass","green_glass",
# "clothes","metal","shoes","biological", "paper", "cardboard"]

# output_class = ['paper', 'cardboard', 'plastic', 'metal', 'trash', 'battery',
            #  'shoes', 'clothes', 'green-glass', 'brown-glass',  'white-glass',
            #    'biological]

# battery
# biological
# brown-glass
# cardboard
# clothes
# green-glass
# metal
# paper
# plastic
# shoes
# trash
# white-glass

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

def preprocessing_input(img_path):
    # img = image.load_img(img_path, target_size=(224, 224))
    # img = image.load_img(img_path, target_size=(384, 384))
    img = image.load_img(img_path, target_size=(400, 400))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img) # ResNet50 preprocess_input
    return img

async def predict(new_image_path):
    print("utiles predict")

    try:
        test_image = preprocessing_input(new_image_path)
        predicted_array = model.predict(test_image)
        predicted_value = output_class[np.argmax(predicted_array)]
        predicted_accuracy = round(np.max(predicted_array) * 100, 2)

        return predicted_value, predicted_accuracy
    except Exception as e:
        return f"Error processing image: {str(e)}", 0
    

def input_trash(trash_type):
    print('trash_type', trash_type)
    messages = ""
    if trash_type == "battery":
        messages = "Good: Properly dispose of batteries in designated battery recycling bins to prevent environmental contamination.\n" \
                   "Bad: Avoid throwing batteries in regular trash bins as they can leak harmful chemicals into the soil and water."
    elif trash_type == "glass":
        messages = "Good: Recycle glass bottles and jars to conserve resources and reduce landfill waste.\n" \
                   "Bad: Avoid mixing broken glass with regular trash as it poses a risk to sanitation workers and can damage recycling equipment."
    elif trash_type == "metal":
        messages = "Good: Recycle metal cans and containers to reduce energy consumption and conserve natural resources.\n" \
                   "Bad: Discarding metal items in the trash contributes to landfill waste and prevents valuable materials from being reused."
    elif trash_type == "organic":
        messages = "Good: Compost food scraps and organic waste to create nutrient-rich soil for gardening and agriculture.\n" \
                   "Bad: Sending organic waste to landfills produces methane gas, a potent greenhouse gas that contributes to climate change."
    elif trash_type == "paper":
        messages = "Good: Recycle paper products such as newspapers, magazines, and cardboard to save trees and reduce air and water pollution.\n" \
                   "Bad: Wasting paper contributes to deforestation and habitat destruction, so use paper products responsibly."
    elif trash_type == "plastic":
        messages = "Good: Reduce plastic consumption by choosing reusable alternatives and recycling plastic containers and packaging.\n" \
                   "Bad: Single-use plastics, such as plastic bags and straws, contribute to pollution and harm marine life when they end up in oceans and waterways."
    elif trash_type == "biological":
        messages = "Good: Dispose of biological waste properly to prevent the spread of diseases and maintain hygiene.\n" \
                   "Bad: Leaving biological waste untreated can attract pests and pose health risks to humans and animals."
    elif trash_type == "cardboard":
        messages = "Good: Recycle cardboard boxes and packaging to conserve resources and reduce waste.\n" \
                   "Bad: Discarding cardboard in the trash fills up landfills and wastes valuable materials that can be reused."
    elif trash_type == "clothes":
        messages = "Good: Donate or recycle old clothes to extend their lifespan and reduce textile waste.\n" \
                   "Bad: Throwing away clothes contributes to textile pollution and wastes valuable resources used in their production."
    elif trash_type == "shoes":
        messages = "Good: Donate or recycle old shoes to reduce waste and provide footwear for those in need.\n" \
                   "Bad: Discarding shoes in the trash adds to landfill waste and prevents materials from being reused or recycled."
    elif trash_type == "trash":
        messages = "Good: Sort your trash properly and recycle whenever possible to minimize environmental impact.\n" \
                   "Bad: Improper disposal of trash can lead to pollution, habitat destruction, and harm to wildlife."
    else:
        messages = "No specific advice available for this type of trash."

    return messages
