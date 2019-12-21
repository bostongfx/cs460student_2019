import numpy as np
import base64

## load a mesh
with open("airplane.ply", 'r') as f:
    lines = f.readlines()

counter = 0
vertices_coming = False
faces_coming = False

## get the infomation of vertices and faces
for i,l in enumerate(lines):

    if l.startswith('element vertex'):
        vertexcounter = int(l.split(' ')[-1].strip())
    elif l.startswith('element face'):
        facecounter = int(l.split(' ')[-1].strip())
    elif l.startswith('end_header'):
        break

vertex_data = lines[i+1:i+vertexcounter+1]
face_data = lines[i+vertexcounter+1:]

## create the VERTICES array
VERTICES = []
MAX_X = -np.inf
MAX_Y = -np.inf
MAX_Z = -np.inf
MIN_X = np.inf
MIN_Y = np.inf
MIN_Z = np.inf

## parse all vertices and find the required fields
for v in vertex_data:
    v = [float(v.strip()) for v in v.strip().split(' ')]

    MAX_X = max(MAX_X, v[0])
    MAX_Y = max(MAX_Y, v[1])
    MAX_Z = max(MAX_Z, v[2])
    MIN_X = min(MIN_X, v[0])
    MIN_Y = min(MIN_Y, v[1])
    MIN_Z = min(MIN_Z, v[2])    

    VERTICES += v

## parse all indices and find the required fields
INDICES = []
MAX = -np.inf
MIN = np.inf
for i in face_data:
    i = [int(i) for i in i.strip().split(' ')[1:]]
    INDICES += i

    MAX = max(MAX, i[0])
    MAX = max(MAX, i[1])
    MAX = max(MAX, i[2])
    MIN = min(MIN, i[0])
    MIN = min(MIN, i[1])
    MIN = min(MIN, i[2])

VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.ushort)


HOWMANY_V = len(VERTICES) / 3 # because its the number of VEC3 groups
HOWMANY_I = len(INDICES)

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes

## base 64 code
B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)

## generate the glTF JSON code
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
            "count": HOWMANY_V,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY_I,
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

result = open("airplane.gltf", "w")

print ( str(gltf).replace("'", '"'), file = result ) # we need double quotes instead of single quotes