import ChartOverview from '@/components/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Users } from 'lucide-react'
import React from 'react'

export default function AuthedHome() {
  return (
    <main className='sm:ml-14 p-4 mt-4 sm:mt-12'>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
            <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
              Total de lugares
            </CardTitle>
            <MapPin className='size-4 ml-auto'/>
            </div>
            <CardDescription>
              Total de pontos turísticos adicionados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
            <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
              Total de usuários
            </CardTitle>
            <Users className='size-4 ml-auto'/>
            </div>
            <CardDescription>
              Total de usuários cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>350</p>
          </CardContent>
        </Card>
      </section>
      <section className='flex flex-col mt-8 gap-4 md:flex-row '>
    <ChartOverview title='Visualizações por local'/>
    <ChartOverview title='Categorias com mais cadastros'/>
      </section>
    </main>
  )
}
