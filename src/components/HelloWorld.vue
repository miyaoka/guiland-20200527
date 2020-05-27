<template>
  <div>
    <h1>#水曜GUI</h1>
    <h2>ベクターのドローイングツールやりたい</h2>

    <section class="control">
      <label>
        tension
        <input
          v-model.number="tension"
          type="range"
          min="0"
          max="1"
          step="any"
        />
        <p>{{ tension.toFixed(2) }}</p>
      </label>
      <label>
        smooth
        <input v-model.number="smooth" type="range" min="2" max="50" step="1" />
        <p>{{ smooth }}</p>
      </label>
      <label>
        stroke-width
        <input
          v-model.number="strokeWidth"
          type="range"
          min="1"
          max="50"
          step="any"
        />
        <p>{{ strokeWidth.toFixed(2) }}</p>
      </label>
      <label>
        color
        <input v-model="color" type="color" />
        <p>{{ color }}</p>
      </label>
      <button @click="clearLines">
        clear lines
      </button>
    </section>

    <svg viewBox="0 0 800 800" class="canvas" @pointerdown="onPointerDown">
      <path
        v-for="(line, i) in lines"
        :key="`l-${i}`"
        class="path"
        :d="getPath(getSmoothedPoints(line.points, line.smooth), line.tension)"
        :stroke="line.color"
        :stroke-width="line.strokeWidth"
      />

      <!-- current -->
      <circle
        v-for="(pt, i) in getSmoothedPoints(points, smooth)"
        :key="`pt-${i}`"
        :cx="pt.x"
        :cy="pt.y"
        r="3"
        fill="grey"
      />
      <path
        class="path"
        :d="getPath(getSmoothedPoints(points, smooth), tension)"
        :stroke="color"
        :stroke-width="strokeWidth"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { catmullRom, Point } from '@/utils/spline'

type Line = {
  points: Point[]
  strokeWidth: number
  color: string
  smooth: number
  tension: number
}

export default Vue.extend({
  data() {
    return {
      lines: [] as Line[],
      points: [] as Point[],
      tension: 1,
      smooth: 10,
      strokeWidth: 5,
      color: '#82adf2',
    }
  },
  computed: {},
  methods: {
    getSmoothedPoints(points: Point[], smooth: number): Point[] {
      return points.filter((_, i) => i % smooth === 0)
    },
    getPath(points: Point[], tension: number): string {
      return catmullRom(points, tension)
    },
    clearLines() {
      this.lines = []
    },
    onPointerDown(e: PointerEvent) {
      document.addEventListener('pointermove', this.onPointerMove)
      document.addEventListener('pointerup', this.onPointerUp)
      const { offsetX, offsetY } = e
      this.points = [{ x: offsetX, y: offsetY }]
    },
    onPointerMove(e: PointerEvent) {
      const { offsetX, offsetY } = e
      this.points.push({ x: offsetX, y: offsetY })
    },
    onPointerUp() {
      document.removeEventListener('pointermove', this.onPointerMove)
      document.removeEventListener('pointerup', this.onPointerUp)
      this.lines.push({
        points: this.points,
        strokeWidth: this.strokeWidth,
        color: this.color,
        smooth: this.smooth,
        tension: this.tension,
      })
      this.points = []
    },
  },
})
</script>

<style scoped lang="scss">
.canvas {
  outline: 1px solid #000;
  width: 800px;
  height: 800px;
}
.path {
  fill: none;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
