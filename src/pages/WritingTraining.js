import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import Aanimation from "../assets/animations/abc anim.json";

export default function WritingTraining() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";

    const startDraw = (e) => {
      setDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e) => {
      if (!drawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const stopDraw = () => setDrawing(false);

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
    };
  }, [drawing]);

  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Writing Training - Letter A</h2>

      {/* Lottie Animation */}
      <Lottie animationData={Aanimation} loop style={{ height: 300, margin: "0 auto" }} />

      <p>Trace the letter here 👇</p>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "2px solid black", marginTop: "20px" }}
      />

      {/* Clear Button */}
      <div>
        <button
          onClick={clearCanvas}
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
