export type Point = {
  x: number
  y: number
}

export const catmullRom = (points: Point[], tension = 1) => {
  if (points.length < 4) return ''

  const firstPt = points[0]
  const lastPt = points[points.length - 1]
  return [
    ...points.slice(1, -2).reduce(
      (acc: string[], _pt, i) => {
        const [pt0, pt1, pt2, pt3] = points.slice(i, i + 4)

        const cp1x = pt1.x + ((pt2.x - pt0.x) / 6) * tension
        const cp1y = pt1.y + ((pt2.y - pt0.y) / 6) * tension
        const cp2x = pt2.x - ((pt3.x - pt1.x) / 6) * tension
        const cp2y = pt2.y - ((pt3.y - pt1.y) / 6) * tension

        return [
          ...acc,
          'C' +
            [cp1x, cp1y, cp2x, cp2y, pt2.x, pt2.y]
              .map((item) => item.toFixed(5))
              .join(','),
        ]
      },
      [`M${firstPt.x},${firstPt.y}`]
    ),
    `L${lastPt.x},${lastPt.y}`,
  ].join('')
}
