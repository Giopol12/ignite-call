import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading>Agendamento descomplicado</Heading>
        <Text>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendario da aplicação"
        />
      </Preview>
    </Container>
  )
}
