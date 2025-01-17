import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  ConeGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight
} from 'three';

export default function Shape3DViewer({ 
  shapeType = 'cube',
  dimensions = { width: 1, height: 1, depth: 1, radius: 1 },
  color = '#2B3A67'
}) {
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const mesh = useRef(null);

  const createGeometry = () => {
    switch(shapeType) {
      case 'sphere':
        return new SphereGeometry(dimensions.radius, 32, 32);
      case 'cylinder':
        return new CylinderGeometry(
          dimensions.radius,
          dimensions.radius,
          dimensions.height,
          32
        );
      case 'cone':
        return new ConeGeometry(
          dimensions.radius,
          dimensions.height,
          32
        );
      default: // cube
        return new BoxGeometry(
          dimensions.width,
          dimensions.height,
          dimensions.depth
        );
    }
  };

  const onContextCreate = async (gl) => {
    // Initialize Scene
    scene.current = new Scene();
    
    // Initialize Camera
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    camera.current = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.current.position.z = 5;

    // Initialize Renderer
    renderer.current = new Renderer({ gl });
    renderer.current.setSize(width, height);
    renderer.current.setClearColor(0xffffff);

    // Add Lights
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.current.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 5);
    scene.current.add(directionalLight);

    // Create Mesh
    const geometry = createGeometry();
    const material = new MeshStandardMaterial({ color });
    mesh.current = new Mesh(geometry, material);
    scene.current.add(mesh.current);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (mesh.current) {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
      }

      renderer.current.render(scene.current, camera.current);
      gl.endFrameEXP();
    };

    animate();
  };

  useEffect(() => {
    if (scene.current && mesh.current) {
      // Update geometry when shape type or dimensions change
      const newGeometry = createGeometry();
      mesh.current.geometry.dispose();
      mesh.current.geometry = newGeometry;
      
      // Update material when color changes
      const newMaterial = new MeshStandardMaterial({ color });
      mesh.current.material.dispose();
      mesh.current.material = newMaterial;
    }
  }, [shapeType, dimensions, color]);

  return (
    <View style={styles.container}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden'
  },
  glView: {
    flex: 1
  }
});