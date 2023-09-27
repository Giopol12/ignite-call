import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero } from './styles'

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
    </Container>
  )
}
