import numpy as np
from PIL import Image


def generate_shares(data, id, share=2):
    data = np.array(data, dtype='u1')

    # Generate image of same size
    img1 = np.zeros(data.shape).astype("u1")
    img2 = np.zeros(data.shape).astype("u1")

    # Set random factor
    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            for k in range(data.shape[2]):
                n = int(np.random.randint(data[i, j, k] + 1))
                img1[i, j, k] = n
                img2[i, j, k] = data[i, j, k] - n

    # Saving shares
    img1 = Image.fromarray(img1)
    img2 = Image.fromarray(img2)

    img1Name = id +"share1.png";
    img2Name = id +"share2.png"
    img1.save("../crypto_images/"+img1Name, "PNG")
    img2.save("../crypto_images/"+img2Name, "PNG")
    return [img1Name,img2Name]


def compress_shares(img1Name, img2Name):
    # Read images
    img1 = np.asarray(Image.open("../crypto_images/"+img1Name)).astype('int16')
    img2 = np.asarray(Image.open("../crypto_images/"+img2Name)).astype('int16')

    img = np.zeros(img1.shape)

    # Fit to range
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            for k in range(img.shape[2]):
                img[i, j, k] = img1[i, j, k] + img2[i, j, k]

    # Save compressed image
    img = img.astype(np.dtype('u1'))

    img = Image.fromarray(img)
    finalImgName = img1Name.replace("share1", "final")
    img.save("../decrypted_images/"+finalImgName, "PNG")
    return finalImgName
