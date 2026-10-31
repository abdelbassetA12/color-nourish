import math
def circ(cx,cy,r): return ell(cx,cy,r,r)
def ell(cx,cy,a,b):
    k=.5523
    return (f'{cx+a:.2f} {cy:.2f} m {cx+a:.2f} {cy+k*b:.2f} {cx+k*a:.2f} {cy+b:.2f} {cx:.2f} {cy+b:.2f} c '
            f'{cx-k*a:.2f} {cy+b:.2f} {cx-a:.2f} {cy+k*b:.2f} {cx-a:.2f} {cy:.2f} c '
            f'{cx-a:.2f} {cy-k*b:.2f} {cx-k*a:.2f} {cy-b:.2f} {cx:.2f} {cy-b:.2f} c '
            f'{cx+k*a:.2f} {cy-b:.2f} {cx+a:.2f} {cy-k*b:.2f} {cx+a:.2f} {cy:.2f} c S\n')
def ring(n,r0,a,b,cx=306,cy=396):
    s=''
    for i in range(n):
        t=2*math.pi*i/n; c,sn=math.cos(t),math.sin(t)
        s+=f'q {c:.4f} {sn:.4f} {-sn:.4f} {c:.4f} {cx} {cy} cm {ell(0,r0,a,b)}Q\n'
    return s
def text(x,y,size,t,font='F1'): return f'BT /{font} {size} Tf {x} {y} Td ({t}) Tj ET\n'
def write(pages,path):
    n=len(pages)
    o=[b'<< /Type /Catalog /Pages 2 0 R >>',
       ('<< /Type /Pages /Kids [%s] /Count %d >>'%(' '.join(f'{5+2*i} 0 R' for i in range(n)),n)).encode(),
       b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
       b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>']
    for i,c in enumerate(pages):
        o.append(f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents {6+2*i} 0 R >>'.encode())
        s=c.encode('latin-1'); o.append(b'<< /Length %d >>\nstream\n'%len(s)+s+b'endstream')
    out=b'%PDF-1.4\n'; offs=[]
    for i,b in enumerate(o):
        offs.append(len(out)); out+=f'{i+1} 0 obj\n'.encode()+b+b'\nendobj\n'
    x=len(out); out+=f'xref\n0 {len(o)+1}\n0000000000 65535 f \n'.encode()
    for f in offs: out+=f'{f:010d} 00000 n \n'.encode()
    out+=f'trailer\n<< /Size {len(o)+1} /Root 1 0 R >>\nstartxref\n{x}\n%%EOF\n'.encode()
    open(path,'wb').write(out)
animals={'A':'Alligator','B':'Bear','C':'Cat'}
kids=[]
for L in 'ABC':
    p='0.4 0.3 0.8 RG 0 g 1.5 w '+text(60,730,22,f'Letter {L} is for {animals[L]}','F1')
    p+=text(60,706,11,'Trace the big letters, then practice on the lines. Color the picture space!','F2')
    p+='1 Tr 3 w [7 6] 0 d 0.3 0.2 0.7 RG '+text(70,470,300,L,'F1')+text(380,520,170,L.lower(),'F1')+'0 Tr [] 0 d 1 w 0 G '
    p+='0.5 w 0 G '+f'60 440 m 552 440 l S\n'
    p+='1 w [4 4] 0 d 0.6 G '
    for y in (380,330,280,230,180,130): p+=f'60 {y} m 552 {y} l S\n'
    p+='[] 0 d 0 G 1.5 w '+f'60 600 492 90 re S\n'+text(70,640,10,'Draw or color your animal here','F2')
    kids.append(p)
write(kids,'public/downloads/kids/free-abc-tracing-sampler.pdf')
ad=[]
cfg=[[(12,150,26,70),(8,80,18,38)],[(16,160,14,60),(12,100,20,40),(8,50,10,26)],[(10,150,32,50),(20,100,8,30),(6,45,14,28)]]
for i,rs in enumerate(cfg):
    p='0 g 0.8 w '+text(60,745,16,f'Free Mandala Coloring Sampler - Design {i+1}','F1')
    for r in (200,190,95,20): p+=circ(306,396,r)
    for a in rs: p+=ring(*a)
    p+=text(60,40,9,'For personal use. Print at 100% scale on US Letter paper.','F2'); ad.append(p)
write(ad,'public/downloads/adults/free-mandala-coloring-sampler.pdf')
