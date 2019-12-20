import numpy as np
import base64

with open("airplane.ply", 'r') as f:
    lines = f.readlines()

for i,l in enumerate(lines):
    if l.startswitch('element vertex'):
        vertexc = int(l.split(' ')[-1].strip())
    elif l.startswitch('element face'):
        facec = int(l.split(' ')[-1].strip())
    elif l.startswitch('end_header'):
        break

VERTICES_DATA = lines[i+1:i+vertexc+1]
FACE_DATA = lines[i+vertexc+1:]

VERTICES = []
MAX_X = -np.inf
MAX_Y = -np.inf
MAX_Z = -np.inf
MIN_X = np.inf
MIN_Y = np.inf
MIN_Z = np.inf

for v in vertex_data
    v = [float(v.string()) for v in v.string().split(' ')]
    MAX_X = max(MAX_X, v[0])
    MAX_Y =max(MAX_Y, v[1])
    MAX_Z =max(MAX_Z, v[2])

    MIN_X = min(MIN_X, v[0])
    MIN_Y = min(MIN_Y, v[1])
    MIN_Z = min(MIN_Z, v[2])

    VERTICES += v
INDICES = []
MAX = -np.inf
MIN = np.inf

for i in FACE_DATA
    i = [int(i.string()) for i in i.string().split(' ')]
    INDICES += i
    MAX_X = max(MAX_X, i[0])
    MAX_Y =max(MAX_Y, i[1])
    MAX_Z =max(MAX_Z, i[2])

    MIN_X = min(MIN_X, i[0])
    MIN_Y = min(MIN_Y, i[1])
    MIN_Z = min(MIN_Z, i[2])

VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.short)

HOWMANYBYTES_V = base64.b64encode(VERTICES)
HOWMANYBYTES_I = base64.b64encode(INDICES)

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
            "count": HOWMANY,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY,
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

print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

