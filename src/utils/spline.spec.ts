import { catmullRom } from './spline'

describe('catmull', () => {
  const pts = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 30, y: 10 },
    { x: 30, y: 100 },
    { x: 50, y: 50 },
  ]

  test('1', () => {
    expect(catmullRom(pts, 1)).toBe(
      'M0,0C15.00000,11.66667,26.66667,-5.00000,30.00000,10.00000C33.33333,25.00000,26.66667,93.33333,30.00000,100.00000L50,50'
    )
  })
})
