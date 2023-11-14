import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      firstname: 'Carlos',
      lastname: 'Meneses',
      email: 'demo@delfosti.com',
      password: 'xyz123456',
    })
    const project1 = await Project.create({
      title: 'Sistema de Gestión Escolar',
      description: 'Desarrollo de una plataforma integral para la gestión académica, administrativa y de comunicación para instituciones educativas.',
    })
    await Task.createMany([
      {
        projectId: project1.id,
        status: 'En progreso',
        title: 'Desarrollo de Funcionalidad de Usuario',
        description: 'Implementar una nueva funcionalidad de usuario para mejorar la experiencia en la plataforma, incluyendo la interfaz y la lógica subyacente.',
      },
      {
        projectId: project1.id,
        title: 'Optimización de Consultas de Base de Datos',
        description: 'Revisar y optimizar consultas de base de datos para mejorar el rendimiento del sistema, reduciendo el tiempo de respuesta y la carga del servidor.',
      },
      {
        projectId: project1.id,
        title: 'Optimización de Consultas de Base de Datos',
        description: 'Revisar y optimizar consultas de base de datos para mejorar el rendimiento del sistema, reduciendo el tiempo de respuesta y la carga del servidor.',
      },
    ])
    const project2 = await Project.create({
      title: 'Plataforma de Comercio Electrónico Local',
      description: 'Creación de una aplicación web que permite a pequeños comercios locales vender sus productos en línea, impulsando la economía local.',
    })
    await Task.createMany([
      {
        projectId: project2.id,
        status: 'En progreso',
        title: 'Integración de API de Terceros',
        description: 'Conectar y configurar la integración con una API de terceros para ampliar las capacidades del sistema y aprovechar nuevas funcionalidades.',
      },
      {
        projectId: project2.id,
        status: 'En progreso',
        title: 'Implementación de Seguridad OAuth2',
        description: 'Reforzar la seguridad del sistema implementando OAuth2 para la autenticación y autorización de usuarios, garantizando un acceso seguro.',
      },
      {
        projectId: project2.id,
        title: 'Creación de Documentación Técnica',
        description: 'Elaborar documentación técnica exhaustiva, incluyendo manuales de usuario y guías de desarrollo, para mejorar la comprensión y la colaboración en el equipo.',
      },
      {
        projectId: project2.id,
        status: 'Completado',
        title: 'Resolución de Problemas de Interfaz de Usuario',
        description: 'Identificar y corregir problemas de diseño y usabilidad en la interfaz de usuario, asegurando una experiencia fluida y amigable para los usuarios finales.',
      },
    ])
  }
}
