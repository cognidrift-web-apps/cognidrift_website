import React, { useState, useEffect, useRef } from 'react';

const VoiceWaveAnimation = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const currentIntensity = useRef(0.6);
  const targetIntensity = useRef(0.6);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matching title gradient: Sky blue (#0ea5e9) → Blue (#3b82f6) → Indigo (#6366f1) → Purple (#8b5cf6)
    const waves = [
      { 
        speed: 0.02, 
        amplitude: 38, 
        frequency: 0.02, 
        baseHue: 199, // #0ea5e9 - Sky blue
        hueShift: 0.02,
        saturation: 90,
        lightness: 62,
        offset: 0, 
        width: 1.8,
        flowSpeed: 0.7,
        depth: 'far',
        baseOpacity: 0.5
      },
      { 
        speed: 0.028, 
        amplitude: 35, 
        frequency: 0.024, 
        baseHue: 217, // #3b82f6 - Blue
        hueShift: 0.025,
        saturation: 91,
        lightness: 67,
        offset: Math.PI / 3, 
        width: 2.0,
        flowSpeed: 1.0,
        depth: 'far',
        baseOpacity: 0.48
      },
      { 
        speed: 0.018, 
        amplitude: 42, 
        frequency: 0.019, 
        baseHue: 239, // #6366f1 - Indigo
        hueShift: 0.022,
        saturation: 84,
        lightness: 67,
        offset: Math.PI / 2, 
        width: 2.3,
        flowSpeed: 0.5,
        depth: 'mid',
        baseOpacity: 0.55
      },
      { 
        speed: 0.025, 
        amplitude: 33, 
        frequency: 0.022, 
        baseHue: 208,
        hueShift: 0.03,
        saturation: 88,
        lightness: 64,
        offset: Math.PI, 
        width: 1.9,
        flowSpeed: 0.9,
        depth: 'mid',
        baseOpacity: 0.52
      },
      { 
        speed: 0.032, 
        amplitude: 30, 
        frequency: 0.027, 
        baseHue: 258, // #8b5cf6 - Purple
        hueShift: 0.018,
        saturation: 86,
        lightness: 66,
        offset: Math.PI * 1.5, 
        width: 2.2,
        flowSpeed: 1.3,
        depth: 'close',
        baseOpacity: 0.6
      },
      { 
        speed: 0.015, 
        amplitude: 40, 
        frequency: 0.016, 
        baseHue: 228,
        hueShift: 0.028,
        saturation: 87,
        lightness: 66,
        offset: Math.PI * 0.7, 
        width: 2.5,
        flowSpeed: 0.4,
        depth: 'close',
        baseOpacity: 0.58
      },
    ];

    const particles = Array.from({ length: 35 }, () => {
      const hueOptions = [199, 217, 239, 258, 208, 228];
      return {
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.45 + 0.25,
        baseHue: hueOptions[Math.floor(Math.random() * hueOptions.length)],
        hueShift: Math.random() * 0.03,
        pulseSpeed: Math.random() * 0.012 + 0.006,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      currentIntensity.current += (targetIntensity.current - currentIntensity.current) * 0.05;
      
      timeRef.current += 0.008 + (currentIntensity.current - 0.6) * 0.02;
      const pulseIntensity = currentIntensity.current;

      // Draw waves with color shifting
      waves.forEach((wave) => {
        const points = [];
        for (let x = 0; x <= width; x += 3) {
          const baseY = height / 2;
          const dynamicAmplitude = wave.amplitude * pulseIntensity;
          
          const horizontalFlow = -timeRef.current * wave.flowSpeed;
          
          const mouseInfluence = 1 + (mousePos.x - 0.5) * 0.15;
          const noise = Math.sin((x + horizontalFlow * 20) * wave.frequency + timeRef.current * wave.speed + wave.offset) * mouseInfluence;
          const secondaryNoise = Math.sin((x - horizontalFlow * 15) * wave.frequency * 1.5 - timeRef.current * wave.speed * 0.7);
          const tertiaryNoise = Math.cos((x + horizontalFlow * 10) * wave.frequency * 0.8 + timeRef.current * wave.speed * 0.5) * 0.5;
          const flowNoise = Math.sin((x + horizontalFlow * 25) * wave.frequency * 0.6 + timeRef.current * wave.speed * 1.2) * 0.3;
          
          const y = baseY + 
                    noise * dynamicAmplitude + 
                    secondaryNoise * (dynamicAmplitude * 0.3) +
                    tertiaryNoise * (dynamicAmplitude * 0.2) +
                    flowNoise * (dynamicAmplitude * 0.25);
          
          points.push({ x, y });
        }

        // Create holographic gradient that shifts through the wave
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        
        // Calculate color shift over time
        const timeHueShift = (timeRef.current * wave.hueShift * 10) % 360;
        
        // Create smooth color transitions across the wave with higher opacity
        for (let i = 0; i <= 10; i++) {
          const stop = i / 10;
          const hue = (wave.baseHue + timeHueShift + (stop * 60)) % 360;
          const opacity = wave.baseOpacity * (0.5 + Math.sin(stop * Math.PI) * 0.5);
          
          gradient.addColorStop(
            stop, 
            `hsla(${hue}, ${wave.saturation}%, ${wave.lightness}%, ${opacity})`
          );
        }

        const depthMultiplier = wave.depth === 'far' ? 0.7 : wave.depth === 'mid' ? 0.9 : 1.0;

        // Stronger glow layers for more vibrant effect
        const glowLayers = [
          { blur: 40, alpha: 0.25, widthMult: 2.5 },
          { blur: 25, alpha: 0.35, widthMult: 1.8 },
          { blur: 12, alpha: 0.45, widthMult: 1.4 }
        ];
        
        glowLayers.forEach(layer => {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          
          const currentHue = (wave.baseHue + timeHueShift) % 360;
          ctx.shadowBlur = layer.blur * (0.6 + currentIntensity.current * 0.5) * depthMultiplier;
          ctx.shadowColor = `hsla(${currentHue}, ${wave.saturation}%, ${wave.lightness}%, ${layer.alpha * currentIntensity.current * depthMultiplier})`;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = wave.width * layer.widthMult * depthMultiplier;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        });
        
        // Final more visible line
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${(wave.baseHue + timeHueShift) % 360}, ${wave.saturation}%, ${wave.lightness}%, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = wave.width * 1.0 * depthMultiplier;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw holographic particles with color shifting
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        const pulse = Math.sin(timeRef.current * particle.pulseSpeed + particle.pulseOffset) * 0.2 + 0.85;
        const particleRadius = particle.radius * pulse;
        const particleOpacity = particle.opacity * pulse;

        // Shift particle hue over time
        const particleHue = (particle.baseHue + timeRef.current * particle.hueShift * 10) % 360;

        // Stronger, more visible glow for particles
        ctx.shadowBlur = 22;
        ctx.shadowColor = `hsla(${particleHue}, 75%, 65%, ${particleOpacity * 0.6})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
        
        // Create radial gradient for vibrant particle
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particleRadius * 2
        );
        particleGradient.addColorStop(0, `hsla(${particleHue}, 80%, 70%, ${particleOpacity})`);
        particleGradient.addColorStop(0.5, `hsla(${particleHue}, 75%, 65%, ${particleOpacity * 0.7})`);
        particleGradient.addColorStop(1, `hsla(${particleHue}, 70%, 60%, 0)`);
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    targetIntensity.current = 0.8 + y * 0.6;
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
    targetIntensity.current = 0.6;
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full absolute inset-0"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default VoiceWaveAnimation;
