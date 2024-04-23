# Waste detection using faster-rcnn (resnet50)

> [!IMPORTANT]
> Please note that the accuracy of the classification may be limited as the model is trained on a small dataset.
> 

## Overview

This project implements waste object classification using the Faster R-CNN algorithm with a ResNet50 model. The backend is developed in Python, utilizing the TensorFlow framework for training and inference. The frontend is developed using React for the user interface.

# Setup
> [!NOTE]
> Make sure you have Python (above `v3.9`) and node (above `v16.0`) installed on your system before running the project.


## 1. Download Repository
 **Clone the repository:**
```bash
git clone https://github.com/G-nizam-A/Waste-Classification.git
```
### or

**Direct download zip file: [link](https://github.com/G-nizam-A/Waste-Classification/archive/refs/heads/main.zip) [90MB]**


## 2. Backend setup


1. Open a terminal or vs code.
2. Navigate to the backend directory:
```bash
cd backend
```
3. Install required libraries : (Only for initial setup)
```bash
pip install -r requirements.txt
```
3. Run the application:
```bash
python main.py
```

## 3. Frontend setup

1. Open a terminal or vs code.
2. Navigate to the frontend directory:
```bash
cd frontend
```
3. Install node_modules: (Only for initial setup)
```bash
npm i
```
3. Run the application:
```bash
npm start
```
4. Open browser:
```bash
http://localhost:3000/
```

## Setup instructions for Real-Time Detection:

1. Download and install the IP Webcam app on your mobile device from the [Google Play Store](https://play.google.com/store/apps/details?id=com.pas.webcam)
   
2. Ensure that both your system and mobile device are connected to the same network. This is necessary for communication between the devices.
   
3. After installing the IP Webcam app on your mobile device, open the app and start the server. Once the server is running, you'll see an IPv4 address displayed on the app's interface. Copy this address.

![image](https://github.com/G-nizam-A/Waste-Classification/assets/109983860/606988c4-e8f2-49ec-b49c-212238303fb3)

4. In the project directory, locate the `.env` file and paste the address to `IPV4URL`.
   ```bash
    IPV4URL=http://192.168.0.102:8080 [paste your IPv4 address here]
    ```
4. Click on START to run real time detection.
   ![Screenshot of Waste Object Classification](screenshots/Screenshot-6.png)
   
5. Run the project `main.py` and click on the "START" button to initiate real-time waste object detection and classification. You should see the live feed from your mobile device's camera, and the system will start identifying and classifying waste objects in real-time.

## Demo Video:

Check out our demo video:
![Demo Video](backend/output_smartphone.mp4)

## Screenshots

![Screenshot of Waste Object Classification](screenshots/Screenshot-1.png)
![Screenshot of Waste Object Classification](screenshots/Screenshot-2.png)
![Screenshot of Waste Object Classification](screenshots/Screenshot-3.png)
![Screenshot of Waste Object Classification](screenshots/Screenshot-4.png)
![Screenshot of Waste Object Classification](screenshots/Screenshot-5.png)
![Screenshot of Waste Object Classification](screenshots/Screenshot-7.png)

## Contribution

Contributions are welcome and encouraged! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Description of your changes'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request detailing your changes.

Your contributions help improve this project for everyone!

## Show Your Support

If you find this project useful, please consider giving it a star ⭐. Your support is greatly appreciated!.
Thank You.
@[Nizam](https://github.com/G-nizam-A)

