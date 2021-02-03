import Gasto from '../domain/gasto'
import { authFetch } from './authFetch'

export async function fetchMonedas() {
  const response = await authFetch(`/monedas`)
  const monedas = await response.json()
  return monedas
}

export async function fetchTarjetas() {
  // console.log("pide tarjetas desde front")
  const response = await authFetch(`/tarjetas`)
  const tarjetas = await response.json()
  return tarjetas
}

export async function fetchTags() {
  const response = await authFetch(`/tags`)
  const tags = await response.json()
  return tags
}

export async function crearTag(tag) {
  const response = await authFetch(`/tags/new`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ nombre: tag }),
  })
}

export async function fetchGastos(mes, anio, tarjeta) {
  let json = {}
  json.mes = mes
  json.anio = anio
  json.id_tarjeta = tarjeta.id
  const response = await authFetch(`/gastos/mes`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
    body: JSON.stringify(json),
  })

  if (response) {
    if (response.ok) {
      const gastosJson = await response.json()
      return gastosJson.map((gastoJson) => Gasto.fromJSON(gastoJson))
    }
  }
}

export async function crearGasto(gasto) {
  const fecha = new Date(gasto.fecha)
  gasto.anio = fecha.getFullYear()
  gasto.mes = fecha.getMonth()
  gasto.dia = fecha.getDate() + 1
  const response = await authFetch(`/gasto`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(gasto),
  })
}

export async function crearTarjeta(tarjeta) {
  const response = await authFetch(`/tarjeta`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(tarjeta),
  })
}

export async function getTotales() {
  const response = await authFetch(`/summary`)
  const totales = await response.json()
  return totales
}
