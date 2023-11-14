/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
			colors: {
				primary: {
					'50': '#edfcf6',
					'100': '#d3f8e8',
					'200': '#bcf2de',
					'300': '#75e0c0',
					'400': '#3dcaa4',
					'500': '#19b08c',
					'600': '#0d8e72',
					'700': '#0a725d',
					'800': '#0b5a4b',
					'900': '#0a4a3f',
					'950': '#042a24',
				},
				secondary: {
					'50': '#f0f9f5',
					'100': '#daf1e4',
					'200': '#b7e3cd',
					'300': '#87ceae',
					'400': '#55b28b',
					'500': '#349570',
					'600': '#24795a',
					'700': '#1c6048',
					'800': '#194c3b',
					'900': '#153f32',
					'950': '#0b231c',
				},
			}
		},
  },
  plugins: [],
}

