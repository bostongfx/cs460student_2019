import numpy as np
import base64

HOWMANY = 3
MAX_X = 0
MAX_Y = 0
MAX_Z = 0
MIN_X = 0
MIN_Y = 0
MIN_Z = 0
ver = []
ind = []

with open('big_spider.ply') as fp:
    line = fp.readline()
    while line:
        if 'element vertex' in line:
            num_vertices = int(line.split()[2])
        if 'element face' in line:
            num_indices = int(line.split()[2])
        if 'end_header' in line:
            for i in range(num_vertices):
                line = fp.readline()
                x = float(line.split()[0])
                y = float(line.split()[1])
                z = float(line.split()[2])
                ver.append(x)
                ver.append(y)
                ver.append(z)
                if i == 0:
                    MAX_X = x
                    MAX_Y = y
                    MAX_Z = z
                    MIN_X = x
                    MIN_Y = y
                    MIN_Z = z

                if x > MAX_X:
                    MAX_X = x
                if y > MAX_Y:
                    MAX_Y = y
                if z > MAX_Z:
                    MAX_Z = z

                if x < MIN_X:
                    MIN_X = x
                if y < MIN_Y:
                    MIN_Y = y
                if z < MIN_Z:
                    MIN_Z = z


            for i in range(num_indices):
                line = fp.readline()
                x = float(line.split()[1])
                y = float(line.split()[2])
                z = float(line.split()[3])
                ind.append(x)
                ind.append(y)
                ind.append(z)

        line = fp.readline()


sorted_indices = sorted(ind)
MAX = sorted_indices[-1]
MIN = sorted_indices[0]


VERTICES = np.array(ver, dtype=np.float32)
INDICES = np.array(ind, dtype=np.int32)

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes


B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)

gltf = {
    "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
    },

  "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5126,
            "count": num_vertices,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5125,
            "count": num_indices*3,
            "type": "SCALAR",
            "max": [MAX],
            "min": [MIN]
        }
    ],

    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_V,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_I,
            "target": 34963
        }
    ],

    "buffers": [
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],

    "meshes": [
        {
            "primitives": [{
                 "mode": 4,
                 "attributes": {
                     "POSITION": 0
                 },
                 "indices": 1
            }]
        }
    ],

    "nodes": [
        {
            "mesh": 0
        }
    ],

    "scenes": [
        {
            "nodes": [
                0
            ]
        }
    ],

    "scene": 0
}
print(str(gltf).replace("'", '"'))
file = open('out.glTF', 'w')
file.write( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes
file.close()
