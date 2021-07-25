import cv2
import matplotlib.pyplot as plt

cap = cv2.VideoCapture("1_c_vio.mp4")

_, frame0 = cap.read()
frame0bw = cv2.cvtColor(frame0,cv2.COLOR_BGR2GRAY)
frame0gb = cv2.GaussianBlur(frame0bw,(15,15),0)

movimento = []

while True:
    ret, frame1 = cap.read()

    if ret != True:
        break

    # frame b/w
    frame1bw = cv2.cvtColor(frame1,cv2.COLOR_BGR2GRAY)

    # frame gaussian blur
    frame1gb = cv2.GaussianBlur(frame1bw,(15,15),0)

    # delta frame
    delta = cv2.absdiff(frame0gb,frame1gb)

    movimento.append(round(delta.sum()/10000000, 3))

    cv2.imshow("Video", frame1)

    # atualizar o frame0
    frame0gb = frame1gb

    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

plt.hist(movimento, density=True, bins=30)
plt.xlabel('Quantidade de Movimento')
plt.ylabel('Frequencia')
plt.show()