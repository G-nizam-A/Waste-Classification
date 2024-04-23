import os
import tensorflow as tf
import numpy as np
import urllib
import cv2
import imageio
from object_detection.utils import visualization_utils as vis_util
from object_detection.utils import label_map_util
import threading
# Load the model and setup the session
MODEL_NAME = 'faster_rcnn_inception_v2'
PATH_TO_FROZEN_GRAPH = MODEL_NAME + '/graph.pb'
PATH_TO_LABELS = os.path.join('data', 'label_map.pbtxt')
import urllib.error

detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.compat.v1.GraphDef()
    with tf.compat.v2.io.gfile.GFile(PATH_TO_FROZEN_GRAPH, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)

desired_ids = [
    27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 81, 84, 85, 86, 87, 90
]

# Define a global stop event
stop_event = threading.Event()

# Define the function for real-time processing with a thread-safe stop flag
def real_time_processing(stop_event, url):
    writer = imageio.get_writer('output_smartphone.mp4', fps=1)

    with detection_graph.as_default():
        config = tf.compat.v1.ConfigProto(log_device_placement=False)
        config.gpu_options.allow_growth = False
        with tf.compat.v1.Session(graph=detection_graph, config=config) as sess:
            image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
            detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
            detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
            detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
            num_detections = detection_graph.get_tensor_by_name('num_detections:0')

            while not stop_event.is_set():  # Use the stop event to control the loop
                try:
                    img_resp = urllib.request.urlopen(url)
                    img_np = np.array(bytearray(img_resp.read()), dtype=np.uint8)
                    img = cv2.imdecode(img_np, -1)
                except (urllib.error.URLError, urllib.error.HTTPError) as e:
                    print(f"Network error: {e}")
                    break  # Exit the loop if there's a network error

                img_expanded = np.expand_dims(img, axis=0)

                (boxes, scores, classes, num) = sess.run(
                    [detection_boxes, detection_scores, detection_classes, num_detections],
                    feed_dict={image_tensor: img_expanded}
                )

                desired_boxes = []
                desired_classes = []
                desired_scores = []
                for i in range(len(classes[0])):
                    if int(classes[0][i]) in desired_ids:
                        desired_boxes.append(boxes[0][i])
                        desired_classes.append(classes[0][i])
                        desired_scores.append(scores[0][i])

                vis_util.visualize_boxes_and_labels_on_image_array(
                    img,
                    np.array(desired_boxes),
                    np.array(desired_classes).astype(np.int32),
                    np.array(desired_scores),
                    category_index,
                    use_normalized_coordinates=True,
                    line_thickness=10
                )

                writer.append_data(img)

                cv2.imshow('Object Detection', img)

                # Check for stop event or Enter key press to break the loop
                if stop_event.is_set() or cv2.waitKey(1) == 13:
                    break

    writer.close()
    cv2.destroyAllWindows()  # Ensure all OpenCV windows are closed

# Clothes
# Plastic
# Wood
# Ball
# Paper
# Bottle
# Glass
# Cup
# Utensils
# Bowl
# Fruit
# Cake
# Toothbrush