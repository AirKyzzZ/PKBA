import argparse
import sys

import cv2
import segno


def generate(url: str, out: str, scale: int, border: int) -> None:
    segno.make(url, error='q').save(out, scale=scale, border=border, dark='#0a0a0a', light='#ffffff')

    decoded, _, _ = cv2.QRCodeDetector().detectAndDecode(cv2.imread(out))
    if decoded != url:
        print(f"ECHEC : le QR genere se relit '{decoded}' au lieu de '{url}'", file=sys.stderr)
        raise SystemExit(1)

    img = cv2.imread(out)
    print(f"  {out}  {img.shape[1]}x{img.shape[0]}  correction Q  relu et conforme")


if __name__ == '__main__':
    p = argparse.ArgumentParser(description="Genere un QR code pour une affiche et verifie qu'il se relit.")
    p.add_argument('url')
    p.add_argument('out')
    p.add_argument('--scale', type=int, default=16)
    p.add_argument('--border', type=int, default=4)
    a = p.parse_args()
    generate(a.url, a.out, a.scale, a.border)
