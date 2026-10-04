// Add a sport here and it appears on /sports. `colors` drives the card gradient, `icon` is an SVG path (24x24 grid).
// `home: true` shows it in the homepage "Explore Sports" strip. Sports found in event data but missing here
// still appear on /sports with default styling.
export const DEFAULT_SPORT = {
  colors: ['#26335F', '#4A5C99'],
  icon: 'M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a3 3 0 0 0 4 2.8M16 6h4v1a3 3 0 0 1-4 2.8M12 13v4M8 20h8M10 17h4v3h-4z',
}

export const SPORTS = [
  { name: 'Cricket', home: true, colors: ['#0E4D92', '#1B8FD9'], icon: 'M6 20 15 11M13 8l4 4-6 6-4-4zM18 19a2 2 0 1 0 0 .01' },
  { name: 'Football', home: true, colors: ['#0B5D3B', '#1FA96A'], icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8l3.5 2.5-1.3 4h-4.4l-1.3-4zM12 3v5M15.5 10.5 20 9M14.2 14.5 17 18.5M9.8 14.5 7 18.5M8.5 10.5 4 9' },
  { name: 'Kabaddi', home: true, colors: ['#8A2A12', '#E5541B'], icon: 'M7 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM17 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7 8v6l-2 6M7 14l2 6M17 8v6l2 6M17 14l-2 6M7 10l5 1 5-1' },
  { name: 'Badminton', home: true, colors: ['#5B2A86', '#A25BE0'], icon: 'M8 3l2 11h4l2-11M8 3h8M10 6h4M12 14v3M10 17h4v4h-4z' },
  { name: 'Hockey', home: true, colors: ['#0F5E66', '#22B3C2'], icon: 'M18 3 9 18H4v2h7L20 5ZM15 20.5a3 1.2 0 1 0 6 0 3 1.2 0 1 0-6 0' },
  { name: 'Athletics', home: true, colors: ['#8C1B3A', '#E0476D'], icon: 'M7 6h10a6 6 0 0 1 0 12H7A6 6 0 0 1 7 6ZM8 9.5h8a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 1 0-5Z' },
  { name: 'Running', home: true, colors: ['#8A5A00', '#F0A81C'], icon: 'M14 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 21l3-6 3 1 2 5M12 15l-1-5 4 1 3 3M11 10l-3 2' },
  { name: 'Tennis', colors: ['#5C7A0A', '#B6D82E'], icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM5.5 5.5a9 9 0 0 1 0 13M18.5 5.5a9 9 0 0 0 0 13' },
  { name: 'Basketball', colors: ['#9A3A0B', '#F08A2B'], icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 3v18M3 12h18M5.5 5.5c4 3 4 10 0 13M18.5 5.5c-4 3-4 10 0 13' },
  { name: 'Volleyball', colors: ['#0F4C75', '#3FA7D6'], icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 3c1 5 4 8 9 9M5.5 5.5c3 2 5 5 5 9.5M20 16c-5 0-9 2-11 5' },
  { name: 'Swimming', colors: ['#2B2F8F', '#6C72E8'], icon: 'M3 18c2 0 2-1.5 4.5-1.5S10 18 12 18s2-1.5 4.5-1.5S19 18 21 18M3 13c2 0 2-1.5 4.5-1.5S10 13 12 13s2-1.5 4.5-1.5S19 13 21 13M16 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' },
  { name: 'Boxing', colors: ['#6B0F1A', '#C0392B'], icon: 'M7 9a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v5a5 5 0 0 1-5 5h-2a4 4 0 0 1-4-4ZM9 19v2h7v-2M7 12h4' },
]
