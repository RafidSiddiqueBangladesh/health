import { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera as MediaPipeCamera } from "@mediapipe/camera_utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlassesOverlay from "./GlassesOverlay";
import type { GlassesType } from "@/pages/VirtualTryOn";

interface FaceCameraProps {
  selectedGlasses: GlassesType;
}

const FaceCamera = ({ selectedGlasses }: FaceCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [faceLandmarks, setFaceLandmarks] = useState<any>(null);
  const { toast } = useToast();
  const faceMeshRef = useRef<FaceMesh | null>(null);
  const cameraRef = useRef<MediaPipeCamera | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        setFaceLandmarks(results.multiFaceLandmarks[0]);
      }
    });

    faceMeshRef.current = faceMesh;

    if (videoRef.current) {
      const camera = new MediaPipeCamera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await faceMesh.send({ image: videoRef.current });
          }
        },
        width: 1280,
        height: 720,
      });
      camera.start();
      cameraRef.current = camera;
    }

    return () => {
      faceMesh.close();
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error("Camera access error:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setFaceLandmarks(null);
  };

  return (
    <Card className="p-6">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover mirror"
          style={{ transform: "scaleX(-1)" }}
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {isActive && faceLandmarks && (
          <div 
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "scaleX(-1)" }}
          >
            <GlassesOverlay 
              landmarks={faceLandmarks}
              glassesType={selectedGlasses}
            />
          </div>
        )}

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <CameraOff className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        {!isActive ? (
          <Button onClick={startCamera} className="flex-1 bg-gradient-medical">
            <Camera className="mr-2 w-4 h-4" />
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="outline" className="flex-1">
            Stop Camera
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FaceCamera;
