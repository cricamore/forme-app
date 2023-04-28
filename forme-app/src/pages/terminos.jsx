import React, { Children, useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router';


export default function Terminos() {

    const router = useRouter()

    const registro = (res) => {
        router.push({
          pathname: '/Registro',
          query: { respuesta: res ? res : null }
        })
      }

    return (
        <Container sx={{ backgroundImage: 'url(./imagenes/terminos.jpg)', minHeight: '100vh', minWidth: '100%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold', color: '#F6BE00', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Términos y condiciones
                </Typography>
                <Box sx={{ borderRadius: '4%', padding: '8%', maxWidth: 460, maxHeight: 500, background: '#F6BE00', display: 'flex', boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)' }}>
                    <Box sx={{ overflowY: 'auto' }}>

                        <h4>
                            Responsabilidades del usuario:
                        </h4>
                        <p>
                            Los usuarios deben aceptar que son responsables de cualquier acción que realicen en la plataforma, y que deben cumplir con todas las leyes y regulaciones aplicables.
                        </p>
                        <h4>
                            Información personal:
                        </h4>
                        <p>
                            La aplicación puede recopilar información personal del usuario, como su nombre, dirección y número de teléfono. Esta información se utilizará únicamente para procesar los pedidos y mejorar la experiencia del usuario.
                        </p>
                        <h4>
                            Pedidos:
                        </h4>
                        <p>
                            Los usuarios pueden realizar pedidos a través de la aplicación, pero deben cumplir con las políticas de la empresa en cuanto a los productos disponibles, los precios y los horarios de entrega.
                        </p>
                        <h4>
                            Pagos:
                        </h4>
                        <p>
                            La aplicación puede requerir que los usuarios proporcionen información de pago, como tarjetas de crédito o cuentas de PayPal, para procesar los pagos de los pedidos. Los usuarios deben aceptar que son responsables de cualquier cargo o transacción realizada en su cuenta.
                        </p>
                        <h4>
                            Cancelaciones:
                        </h4>
                        <p>
                            Los usuarios pueden cancelar sus pedidos en cualquier momento, pero deben cumplir con las políticas de cancelación de la empresa. Esto puede incluir cargos por cancelación o la imposibilidad de cancelar pedidos en ciertos momentos.
                        </p>
                        <h4>
                            Propiedad intelectual:
                        </h4>
                        <p>
                            Todos los derechos de propiedad intelectual de la aplicación y sus contenidos pertenecen a la empresa. Los usuarios no tienen derecho a utilizar estos contenidos sin el permiso expreso de la empresa.
                        </p>

                        <h4>
                            Limitación de responsabilidad:
                        </h4>
                        <p>
                            La empresa no será responsable de ningún daño o pérdida que el usuario pueda sufrir al utilizar la aplicación, excepto en los casos en que la empresa haya actuado con negligencia o incumplido alguna de sus obligaciones legales.
                        </p>
                    </Box>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginTop: '1rem' }}
                >
                    <Button
                        variant="contained"
                        sx={{ background: '#C52B2B', color: '#fff' }}
                        onClick={registro('no-valido')}
                    >
                        cancelar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ marginTop: '1rem', background: '#40931A', color: '#fff' }}
                        onClick={registro('valido')}
                    >
                        Acepto
                    </Button>
                </Stack>


            </div>
        </Container>
    )
}
