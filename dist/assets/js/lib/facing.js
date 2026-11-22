// Which way does my house face? Pure functions, no DOM.
// Facing is the direction you look when you stand in the front door and look
// out to the street.

export const POINTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const NAMES = {
  en: { N: 'North', NE: 'Northeast', E: 'East', SE: 'Southeast', S: 'South', SW: 'Southwest', W: 'West', NW: 'Northwest' },
  es: { N: 'Norte', NE: 'Noreste', E: 'Este', SE: 'Sureste', S: 'Sur', SW: 'Suroeste', W: 'Oeste', NW: 'Noroeste' },
};

export const SHORT = {
  en: { N: 'N', NE: 'NE', E: 'E', SE: 'SE', S: 'S', SW: 'SW', W: 'W', NW: 'NW' },
  es: { N: 'N', NE: 'NE', E: 'E', SE: 'SE', S: 'S', SW: 'SO', W: 'O', NW: 'NO' },
};

export function normalizeBearing(b) {
  const n = Number(b);
  if (!Number.isFinite(n)) return NaN;
  return ((n % 360) + 360) % 360;
}

export function toPoint(bearing) {
  const b = normalizeBearing(bearing);
  if (Number.isNaN(b)) return null;
  return POINTS[Math.round(b / 45) % 8];
}

export function opposite(point) {
  const i = POINTS.indexOf(point);
  if (i < 0) return null;
  return POINTS[(i + 4) % 8];
}

export function facing(bearing) {
  const b = normalizeBearing(bearing);
  if (Number.isNaN(b)) return null;
  const front = toPoint(b);
  return { bearing: b, front, back: opposite(front), backBearing: (b + 180) % 360 };
}

// Compass heading from a DeviceOrientation event. iOS Safari gives
// webkitCompassHeading (degrees clockwise from magnetic north). Other browsers
// give alpha on an absolute event (degrees counterclockwise), so heading is
// 360 minus alpha. Returns null when no absolute heading is available.
export function headingFromEvent(e) {
  if (!e) return null;
  if (typeof e.webkitCompassHeading === 'number' && Number.isFinite(e.webkitCompassHeading)) {
    return normalizeBearing(e.webkitCompassHeading);
  }
  if (e.absolute === true && typeof e.alpha === 'number' && Number.isFinite(e.alpha)) {
    return normalizeBearing(360 - e.alpha);
  }
  return null;
}

// Short, factual sun notes for Texas, keyed by the direction the backyard faces.
// Texas lies between about 26 and 36 degrees north, so the midday sun is in the
// southern sky all year. In summer the sun rises north of east and sets north of
// west; in winter it rises south of east and sets south of west.
export const SUN_NOTES = {
  en: {
    N: 'The house shades much of the backyard in winter. In summer the sun rises and sets north of east and west, so the yard gets early morning and evening sun. The front gets sun most of the day all year.',
    NE: 'The backyard gets morning sun and afternoon shade from the house, the coolest yard in a Texas summer. The front takes the afternoon sun.',
    E: 'The backyard gets morning sun and afternoon shade. The front faces west and takes the afternoon sun, the hottest exposure in a Texas summer.',
    SE: 'The backyard gets sun from morning into early afternoon, then shade. The front gets late afternoon sun in summer.',
    S: 'The backyard gets sun most of the day in every season, and the rear windows get the most winter sun. The front stays in shade much of the year.',
    SW: 'The backyard and rear windows take midday and afternoon sun. Plan for patio shade and low solar gain glass on the back. The front gets morning sun.',
    W: 'The backyard takes the afternoon and evening sun, the hottest exposure in a Texas summer. Rear windows and the patio need shade. The front gets morning sun.',
    NW: 'The backyard is shaded in the morning and gets late afternoon and evening sun in summer. The front gets morning to midday sun.',
  },
  es: {
    N: 'La casa le da sombra a buena parte del patio en invierno. En verano el sol sale y se pone al norte del este y del oeste, así que el patio recibe sol temprano en la mañana y al atardecer. El frente recibe sol casi todo el día todo el año.',
    NE: 'El patio recibe sol en la mañana y sombra de la casa en la tarde, el patio más fresco en un verano de Texas. El frente recibe el sol de la tarde.',
    E: 'El patio recibe sol en la mañana y sombra en la tarde. El frente da al oeste y recibe el sol de la tarde, la exposición más caliente en un verano de Texas.',
    SE: 'El patio recibe sol desde la mañana hasta el principio de la tarde y luego sombra. El frente recibe sol al final de la tarde en verano.',
    S: 'El patio recibe sol casi todo el día en todas las estaciones, y las ventanas de atrás reciben más sol en invierno. El frente queda en sombra gran parte del año.',
    SW: 'El patio y las ventanas de atrás reciben el sol del mediodía y de la tarde. Conviene planear sombra para el patio y vidrio de baja ganancia solar atrás. El frente recibe sol en la mañana.',
    W: 'El patio recibe el sol de la tarde y del atardecer, la exposición más caliente en un verano de Texas. Las ventanas de atrás y el patio necesitan sombra. El frente recibe sol en la mañana.',
    NW: 'El patio tiene sombra en la mañana y recibe sol al final de la tarde y al atardecer en verano. El frente recibe sol de la mañana al mediodía.',
  },
};

export function sunNote(backPoint, lang = 'en') {
  return (SUN_NOTES[lang] || SUN_NOTES.en)[backPoint] || '';
}
