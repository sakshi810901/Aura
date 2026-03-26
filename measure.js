import fs from 'fs';
const data = fs.readFileSync('public/models/avatar/dresses/dress01.glb');
const chunk0Length = data.readUInt32LE(12);
const jsonString = data.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonString);

let out = '';
gltf.meshes.forEach(mesh => {
  mesh.primitives.forEach(prim => {
    const posAccessor = gltf.accessors[prim.attributes.POSITION];
    out += "Accessor min: " + JSON.stringify(posAccessor.min) + "\n";
    out += "Accessor max: " + JSON.stringify(posAccessor.max) + "\n";
    
    const dx = posAccessor.max[0] - posAccessor.min[0];
    const dy = posAccessor.max[1] - posAccessor.min[1];
    const dz = posAccessor.max[2] - posAccessor.min[2];
    out += "Size:" + dx + ", " + dy + ", " + dz + "\n";
  });
});
fs.writeFileSync('measure.txt', out);
