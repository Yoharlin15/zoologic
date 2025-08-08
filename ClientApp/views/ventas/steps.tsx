"use client"

import React from "react"
import { Card } from "primereact/card"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export default function InstruccionesCompra() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-3xl shadow-4">
        <h2 className="text-center text-3xl font-bold mb-3 text-green-700">¿Cómo comprar tus boletos?</h2>
        <p className="text-center mb-4 text-gray-700">
          Sigue estos sencillos pasos para completar tu compra en Zoologic:
        </p>

        <div className="mb-3">
          <h4 className="text-xl font-semibold text-green-600">
            <i className="pi pi-calendar mr-2 text-lg" /> Paso 1: Selecciona la fecha y cantidad de boletos
          </h4>
          <p className="text-gray-700 ml-5">
            Elige la fecha en la que deseas visitar el zoológico y la cantidad de boletos que deseas comprar para adultos o niños.
          </p>
        </div>

        <Divider />

        <div className="mb-3">
          <h4 className="text-xl font-semibold text-green-600">
            <i className="pi pi-credit-card mr-2 text-lg" /> Paso 2: Ingresa la información de pago
          </h4>
          <p className="text-gray-700 ml-5">
            Proporciona los datos de tu tarjeta de crédito o débito en nuestra plataforma segura de pago.
          </p>
        </div>

        <Divider />

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-green-600">
            <i className="pi pi-check-circle mr-2 text-lg" /> Paso 3: Recibe tu código QR y factura
          </h4>
          <p className="text-gray-700 ml-5">
            Una vez procesado el pago, recibirás un boleto digital con código QR y tu factura”.
          </p>
        </div>

        <div className="flex flex-column md:flex-row justify-content-center align-items-center gap-3 mt-5">
          <Button
            label="Volver al inicio"
            className="p-button-rounded p-button-success"
            icon="pi pi-arrow-left"
            onClick={() => navigate("/")}
          />
          
          <Button
            label="Comenzar compra"
            icon="pi pi-shopping-cart"
            className="p-button-rounded p-button-success"
            onClick={() => navigate("/tickets")}
          />
        </div>
      </Card>
    </div>
  )
}
