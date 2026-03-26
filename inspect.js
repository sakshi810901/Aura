import fs from 'fs';
let data = fs.readFileSync('public/models/avatar/girl.glb');
const chunk0Length = data.readUInt32LE(12);
const jsonString = data.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonString);

let out = 'girl.glb:\n';
if (gltf.nodes) {
  gltf.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
      out += `  Node [${i}] name=${n.name} meshName=${gltf.meshes[n.mesh]?.name} skin=${n.skin}\n`;
    }
  });
}

try {
  let dData = fs.readFileSync('public/models/avatar/dresses/dress01.glb');
  let dLen = dData.readUInt32LE(12);
  let dJson = JSON.parse(dData.toString('utf8', 20, 20 + dLen));
  out += '\ndress01.glb:\n';
  dJson.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
      out += `  Node [${i}] name=${n.name} meshName=${dJson.meshes[n.mesh]?.name} skin=${n.skin}\n`;
    }
  });
} catch(e){}

try {
  let tData = fs.readFileSync('public/models/avatar/tops/top01.glb');
  let tLen = tData.readUInt32LE(12);
  let tJson = JSON.parse(tData.toString('utf8', 20, 20 + tLen));
  out += '\ntop01.glb:\n';
  tJson.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
      out += `  Node [${i}] name=${n.name} meshName=${tJson.meshes[n.mesh]?.name} skin=${n.skin}\n`;
    }
  });
} catch(e){}

fs.writeFileSync('glb_info.txt', out);
