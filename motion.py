import cv2
import time

cap = cv2.VideoCapture("6_rgb.mp4")

_, frame0 = cap.read()
frame0bw = cv2.cvtColor(frame0,cv2.COLOR_BGR2GRAY)
frame0gb = cv2.GaussianBlur(frame0bw,(15,15),0)


while True:

    ret, frame1 = cap.read()

    if ret != True:
        break

    # cvtColor - transformar a imagem para tons preto e branco
    frame1bw = cv2.cvtColor(frame1,cv2.COLOR_BGR2GRAY)

    # GaussianBLur - desfocar a imagem para reduzir o ruido da imagem
    frame1gb = cv2.GaussianBlur(frame1bw,(15,15),0)

    # absdiff - verificar o que se moveu na imagem
    delta = cv2.absdiff(frame0gb,frame1gb)

    # threshold - conversao binaria do delta
    thresh = cv2.threshold(delta,15,255,cv2.THRESH_BINARY)[1]

    # dilate - preencher os espaços do thresh
    dilate = cv2.dilate(thresh,None,iterations=3)

    # heatmap - consersao do delta em heatmap, para realcar as zonas com mais movimento
    heatmap = cv2.applyColorMap(cv2.dilate(delta,None,iterations=5), cv2.COLORMAP_JET)

    # determinar a quantidade de movimento
    n = round(delta.sum()/10000000, 2)

    if n > 0.25:
        text = 'Violence'
    else:
        text = 'No Violence'

    # escrever na imagem o estado de movimento
    cv2.putText(heatmap, text, (10,35), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255,255,255), 2, cv2.LINE_AA)

    # atualizar o frame0
    frame0gb = frame1gb

    cv2.imshow("Heatmap", heatmap)

    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()