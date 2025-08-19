// src/types/react-qr-scanner.d.ts
declare module "react-qr-scanner" {
  import * as React from "react";

  export interface QrScannerProps {
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (data: { text?: string } | string | null) => void;
    style?: React.CSSProperties;
    className?: string;
    // muchas builds aceptan constraints; lo tipamos flexible
    constraints?: MediaStreamConstraints | { video?: MediaTrackConstraints };
    facingMode?: "user" | "environment";
    legacyMode?: boolean;
  }

  const QrScanner: React.ComponentType<QrScannerProps>;
  export default QrScanner;
}
