import cv2
import time

def process_video():
    cap = cv2.VideoCapture("6_rgb.mp4")

    _, frame0 = cap.read()
    frame0bw = cv2.cvtColor(frame0,cv2.COLOR_BGR2GRAY)
    frame0gb = cv2.GaussianBlur(frame0bw,(15,15),0)

    ini = -1
    text = None
    limit = 0.35

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

        # definir a presenca de violencia
        if text == None: # no primeiro ciclo, e' preciso definir estado inicial
            if n >= limit:
                text = 'Violence'
                x = 1
            else:
                text = 'No Violence'
                x = 0
        else: # nos seguintes ciclos e' preciso determinar a progressao do estado de violencia
            if ini == -1: # se ini for -1 significa que nao vai existir possivel alteracao do estado
                if x == 0 and n >= 0.3: # se estado for 0, nao violencia, e existir quantidade de movimento suficiente para representar violencia
                    ini = time.time() # ini guarda o tempo em que a alteracao surgiu
                elif x == 1 and n < 0.3: # se estado for 1, violencia, e nao existir quantidade de movimento suficiente para representar violencia
                    ini = time.time() # ini guarda o tempo em que a alteracao surgiu
            else: # se ini for diferente de -1 significa que existe uma possivel alteracao do estado
                if x == 0: # no caso de nao violencia
                    if (time.time()-ini) < 0.5 and n < limit: # se o tempo desde a alteracao for inferior a 0.5s e a quantidade de movimento deixar de representar violencia
                        ini = -1 # ini volta a -1 porque a alteracao deixa de ter efeito
                    elif (time.time()-ini) >= 0.5 and n >= limit: # se o tempo desde a alteracao for superior a 0.5s e a quantidade de movimento continuar representar violencia
                        text = 'Violence' # estado e' alterado
                        x = 1
                        ini = -1
                else: # no caso de violencia
                    if (time.time()-ini) < 0.5 and n >= limit: # se o tempo desde a alteracao for inferior a 0.5s e a quantidade de movimento representar violencia
                        ini = -1 # ini volta a -1 porque a alteracao deixa de ter efeito
                    elif (time.time()-ini) >= 0.5 and n < limit: # se o tempo desde a alteracao for superior a 0.5s e a quantidade de movimento continuar a nao representar violencia
                        text = 'No Violence' # estado e' alterado
                        x = 0
                        ini = -1

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