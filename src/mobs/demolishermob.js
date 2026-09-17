import * as THREE from 'three';

function shadow(mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createDemolisherMob() {
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x222233, roughness: 0.45, metalness: 0.85 });
  const legMat     = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, roughness: 0.5,  metalness: 0.75 });
  const jointMat   = new THREE.MeshStandardMaterial({ color: 0x556677, roughness: 0.3,  metalness: 0.9  });
  const brainMat   = new THREE.MeshStandardMaterial({ color: 0xff6688, emissive: 0x880022, emissiveIntensity: 0.5, roughness: 0.75, metalness: 0.0 });
  const veinMat    = new THREE.MeshStandardMaterial({ color: 0xff2244, emissive: 0xff0022, emissiveIntensity: 1.2, roughness: 0.2,  metalness: 0.0 });
  const eyeMat     = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 2.5, roughness: 0.05, metalness: 0.0 });
  const chaingunMat= new THREE.MeshStandardMaterial({ color: 0x445566, roughness: 0.4, metalness: 0.85 });
  const muzzleMat  = new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xff8800, emissiveIntensity: 1.2, roughness: 0.1, metalness: 0.0 });
  const techMat    = new THREE.MeshStandardMaterial({ color: 0x334455, roughness: 0.4, metalness: 0.8 });

  const model = new THREE.Group();

  const chassis = shadow(new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.75, 2.2), chassisMat));
  chassis.position.y = 1.45;
  model.add(chassis);

  const bellyPlate = shadow(new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.34, 1.7), techMat));
  bellyPlate.position.y = 1.06;
  model.add(bellyPlate);

  [-1, 1].forEach((s) => {
    const side = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.6, 1.95), legMat));
    side.position.set(s * 1.46, 1.45, 0);
    model.add(side);
  });

  [[-0.95, 0.82], [0.95, 0.82], [-0.95, -0.82], [0.95, -0.82]].forEach(([px, pz]) => {
    const panel = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.5), jointMat));
    panel.position.set(px, 1.78, pz);
    model.add(panel);
  });

  const spine = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.46, 1.35, 12), techMat));
  spine.position.set(0, 2.35, 0);
  model.add(spine);

  const neckRing = shadow(new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.09, 9, 20), techMat));
  neckRing.rotation.x = Math.PI / 2;
  neckRing.position.set(0, 2.98, 0);
  model.add(neckRing);

  const legGroups = [];
  function buildSpiderLeg(side, zOff, phaseOffset) {
    const g = new THREE.Group();
    g.position.set(side * 1.22, 1.45, zOff);
    g.add(shadow(new THREE.Mesh(new THREE.SphereGeometry(0.18, 9, 8), jointMat)));

    const shoulder = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 1.08, 8), legMat));
    shoulder.position.set(side * 0.55, -0.26, 0.15 * Math.sign(zOff + 0.001));
    shoulder.rotation.z = side * 0.64;
    shoulder.rotation.x = -0.22;
    g.add(shoulder);

    const knee = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 7), jointMat));
    knee.position.set(side * 0.98, -0.58, 0.22 * Math.sign(zOff + 0.001));
    g.add(knee);

    const fore = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, 1.3, 8), legMat));
    fore.position.set(side * 1.36, -1.08, 0.3 * Math.sign(zOff + 0.001));
    fore.rotation.z = side * 1.02;
    fore.rotation.x = 0.54;
    g.add(fore);

    const ankle = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 7), jointMat));
    ankle.position.set(side * 1.68, -1.5, 0.38 * Math.sign(zOff + 0.001));
    g.add(ankle);

    const claw = shadow(new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.38, 7), jointMat));
    claw.position.set(side * 1.86, -1.84, 0.43 * Math.sign(zOff + 0.001));
    claw.rotation.z = side * 1.42;
    claw.rotation.x = 1.02;
    g.add(claw);

    g.userData.phaseOffset = phaseOffset;
    model.add(g);
    return g;
  }

  const legRows = [-0.9, -0.3, 0.3, 0.9];
  legRows.forEach((z, i) => {
    legGroups.push(buildSpiderLeg(1, z, i * 0.5));
    legGroups.push(buildSpiderLeg(-1, z, i * 0.5 + Math.PI));
  });

  const brainGroup = new THREE.Group();
  brainGroup.position.set(0, 3.28, 0);
  model.add(brainGroup);

  const brainLeft = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.92, 18, 16), brainMat));
  brainLeft.position.x = -0.23;
  brainLeft.scale.set(1, 0.84, 0.98);
  brainGroup.add(brainLeft);

  const brainRight = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.92, 18, 16), brainMat));
  brainRight.position.x = 0.23;
  brainRight.scale.set(1, 0.84, 0.98);
  brainGroup.add(brainRight);

  const brainBridge = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.88, 10), brainMat));
  brainBridge.rotation.z = Math.PI / 2;
  brainBridge.position.set(0, -0.04, 0);
  brainGroup.add(brainBridge);

  [[0, 0, 0], [0.52, 0.22, 0], [-0.52, 0.22, 0], [0.2, 0.5, 0.48], [-0.2, 0.5, -0.48], [0, -0.38, 0.58], [0, -0.42, -0.56], [0.28, -0.56, 0]].forEach(([rx, ry, rz]) => {
    const fold = shadow(new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.052, 7, 18), veinMat));
    fold.rotation.set(rx, ry, rz);
    fold.scale.set(1.02, 0.48, 0.98);
    brainGroup.add(fold);
  });

  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const tube = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.012, 0.88, 6), veinMat));
    tube.position.set(Math.cos(a) * 0.52, -0.64, Math.sin(a) * 0.45);
    tube.rotation.z = Math.cos(a) * 0.25;
    tube.rotation.x = Math.sin(a) * 0.25;
    brainGroup.add(tube);
  }

  const skullCage = shadow(new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.08, 10, 28), techMat));
  skullCage.rotation.x = Math.PI / 2;
  skullCage.position.y = -0.2;
  brainGroup.add(skullCage);

  const bossEye = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), eyeMat));
  bossEye.position.set(0, 0.06, 0.9);
  brainGroup.add(bossEye);

  const eyeRim = shadow(new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.055, 10, 20), techMat));
  eyeRim.position.set(0, 0.06, 0.82);
  brainGroup.add(eyeRim);

  [[-0.45, 0.28, 0.76], [0.45, 0.28, 0.76]].forEach(([x, y, z]) => {
    const sEye = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.095, 8, 8), eyeMat));
    sEye.position.set(x, y, z);
    brainGroup.add(sEye);
  });

  const turretBase = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.42), techMat));
  turretBase.position.set(1.56, 1.78, -0.3);
  model.add(turretBase);

  [{ dx: 0, dy: 0.13 }, { dx: 0.12, dy: -0.07 }, { dx: -0.12, dy: -0.07 }].forEach(({ dx, dy }) => {
    const b = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.15, 9), chaingunMat));
    b.rotation.x = Math.PI / 2;
    b.position.set(1.56 + dx, 1.78 + dy, -0.95);
    model.add(b);
  });

  const muzzle = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.12, 9, 9), muzzleMat));
  muzzle.position.set(1.56, 1.78, -1.45);
  model.add(muzzle);

  const wrapper = new THREE.Group();
  wrapper.add(model);

  const tempBox = new THREE.Box3().setFromObject(model);
  const alignOffset = -tempBox.min.y;
  model.position.y = alignOffset;

  function applyScale(s) { wrapper.scale.setScalar(s); }

  const chassisBaseY = 1.45 + alignOffset;
  const spineBaseY = 2.35 + alignOffset;
  const brainBaseY = 3.28 + alignOffset;
  const mountBaseY = 1.78 + alignOffset;
  let _t = 0;

  function applyWalkPhase(phase, moving) {
    _t += moving ? 0.018 : 0.009;
    const bob = Math.sin(_t * 1.45) * 0.2;
    chassis.position.y = chassisBaseY + bob;
    bellyPlate.position.y = 1.06 + alignOffset + bob;
    spine.position.y = spineBaseY + bob;
    neckRing.position.y = 2.98 + alignOffset + bob;
    brainGroup.position.y = brainBaseY + bob;
    turretBase.position.y = mountBaseY + bob;
    muzzle.position.y = mountBaseY + bob;

    legGroups.forEach((leg, i) => {
      const swing = Math.sin(phase * 1.55 + leg.userData.phaseOffset) * (moving ? 0.34 : 0.14);
      leg.rotation.x = swing;
      leg.rotation.z = Math.cos(phase * 0.62 + i * 0.45) * 0.05;
      leg.position.y = chassisBaseY + bob;
    });

    brainGroup.rotation.x = Math.sin(_t * 0.4) * 0.06;
    brainGroup.rotation.z = Math.sin(_t * 0.31 + 1.0) * 0.055;

    veinMat.emissiveIntensity = 1.2 + Math.sin(_t * 1.7) * 0.65;
    eyeMat.emissiveIntensity = 2.4 + Math.sin(_t * 2.4) * 1.3;
    muzzleMat.emissiveIntensity = 1.0 + Math.sin(_t * 3.0) * 0.45;
  }

  return { root: wrapper, applyScale, applyWalkPhase };
}