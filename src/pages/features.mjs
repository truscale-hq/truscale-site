export default {
  slug: 'features',
  title: { en: 'Features', es: 'Funciones' },
  description: {
    en: 'AI Plan Reader, phone measuring, floor plans and 3D, construction sheets, whole-house takeoff, Deal Analyzer, structure and site checks, finish selections, permits, POs, schedule and closeout.',
    es: 'Lector de planos con IA, medición con teléfono, planos y 3D, hojas de construcción, cuantificación de toda la casa, analizador de negocios, revisión de estructura y terreno, acabados, permisos, compras, calendario y cierre.',
  },
  body: ({ L, B, frame, shot }) => {
    const toc = [
      ['plan-reader', L('Plan Reader', 'Lector de planos')],
      ['measure', L('Measuring', 'Medición')],
      ['drawings', L('Drawings and 3D', 'Planos y 3D')],
      ['takeoff', L('Takeoff', 'Cuantificación')],
      ['deals', L('Deal Analyzer', 'Analizador de negocios')],
      ['structure', L('Structure', 'Estructura')],
      ['site', L('Site', 'Terreno')],
      ['selections', L('Selections', 'Acabados')],
      ['jobs', L('Permits, POs, schedule', 'Permisos, compras, calendario')],
      ['field', L('Field and closeout', 'Obra y cierre')],
    ];
    return `
<section class="page-head on-dark">
  <div class="wrap">
    <h1>${L('Everything the job needs, on one project record.', 'Todo lo que necesita la obra, en un solo expediente.')}</h1>
    <p class="lede">${L(`Here is what ${B} does, stage by stage. Screens are from the app with sample data.`, `Esto es lo que hace ${B}, etapa por etapa. Las pantallas son de la app con datos de ejemplo.`)}</p>
    <nav class="toc" aria-label="${L('On this page', 'En esta página')}">${toc.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</nav>
  </div>
</section>

<div class="wrap">
  <section class="feature" id="plan-reader" aria-labelledby="f1">
    <div class="text">
      <span class="kicker">${L('Plan', 'Planear')}</span>
      <h2 id="f1">${L('AI Plan Reader', 'Lector de planos con IA')}</h2>
      <p>${L('Upload a plan set as PDF, CAD or phone photos. The Plan Reader reads each sheet for dimensions, rooms and schedules, then cross-checks the set: sheets dated differently, blank revision blocks, a fireplace on the plan with no chimney on the elevation.', 'Suba el juego de planos en PDF, CAD o fotos del teléfono. El lector revisa cada hoja para sacar cotas, cuartos y tablas, y luego compara el juego completo: hojas con fechas distintas, bloques de revisión vacíos, una chimenea en el plano que no aparece en la fachada.')}</p>
      <ul class="ticks">
        <li>${L('Flags can be turned into RFIs.', 'Las alertas se pueden convertir en RFIs.')}</li>
        <li>${L('Sheets that cannot be read are marked, not guessed.', 'Las hojas que no se pueden leer se marcan, no se adivinan.')}</li>
        <li><strong>${L('An estimator verifies', 'Un estimador verifica')}</strong> ${L('the numbers before they feed the takeoff.', 'los números antes de que pasen a la cuantificación.')}</li>
      </ul>
    </div>
    <div>${frame('plans-main', L('Plan Reader with uploaded sheets A3, A4, A5 and an exterior rendering, and three cross-check flags.', 'Lector de planos con las hojas A3, A4, A5 y una vista exterior, y tres alertas de revisión.'))}</div>
  </section>

  <section class="feature" id="measure" aria-labelledby="f2">
    <div class="text">
      <span class="kicker">${L('Plan', 'Planear')}</span>
      <h2 id="f2">${L('Measure without a laser', 'Medir sin láser')}</h2>
      <p>${L('On a Pro iPhone or iPad, the LiDAR sensor scans each room. On any other phone, take a photo with the printed scale card on the wall. Either way, tape one wall to check the scan.', 'En un iPhone o iPad Pro, el sensor LiDAR escanea cada cuarto. En cualquier otro teléfono, tome una foto con la tarjeta de escala impresa en el muro. En los dos casos, mida un muro con cinta para revisar el escaneo.')}</p>
      <ul class="ticks">
        <li>${L('If the tape and the scan differ by more than the tolerance, the room is flagged for a new scan.', 'Si la cinta y el escaneo no coinciden dentro de la tolerancia, el cuarto se marca para escanear otra vez.')}</li>
        <li>${L('Ordering and structural use wait until the room passes.', 'Los pedidos y el uso estructural esperan a que el cuarto pase.')}</li>
        <li>${L('Measured rooms feed the floor plan.', 'Los cuartos medidos pasan al plano.')}</li>
      </ul>
    </div>
    <div class="shots two">
      <div class="phone static">${shot('floor-plan-phone', L('Measured first floor plan on a phone with room areas and dimensions.', 'Plano medido del primer piso en el teléfono con áreas y cotas.'), { sizes: '300px' })}</div>
      <div>
        <table class="spec">
          <tbody>
            <tr><th scope="row">${L('Pro iPhone, iPad', 'iPhone, iPad Pro')}</th><td>${L('LiDAR room scan', 'Escaneo LiDAR')}</td></tr>
            <tr><th scope="row">${L('Other phones', 'Otros teléfonos')}</th><td>${L('Photo plus scale card', 'Foto más tarjeta de escala')}</td></tr>
            <tr><th scope="row">${L('Every phone', 'Todos')}</th><td>${L('Tape check on one wall', 'Revisión con cinta en un muro')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="feature" id="drawings" aria-labelledby="f3">
    <div class="text">
      <span class="kicker">${L('Plan', 'Planear')}</span>
      <h2 id="f3">${L('Floor plans, 3D and construction sheets', 'Planos, 3D y hojas de construcción')}</h2>
      <p>${L('Draw walls, rooms, doors and windows with dimensions. The 3D model builds from the plan. Layers for HVAC, plumbing and electrical sit on the same plan.', 'Dibuje muros, cuartos, puertas y ventanas con cotas. El modelo 3D se arma desde el plano. Las capas de aire acondicionado, plomería y electricidad van en el mismo plano.')}</p>
      <ul class="ticks">
        <li>${L('Sheets for A, M, P, E and S with title blocks and schedules.', 'Hojas A, M, P, E y S con cuadro de rótulo y tablas.')}</li>
        <li>${L('Print at 24 by 36 or 11 by 17, or save as PDF.', 'Imprima en 24 por 36 u 11 por 17, o guarde como PDF.')}</li>
        <li>${L('Sheets can carry a preliminary stamp until a licensed professional seals them.', 'Las hojas pueden llevar sello de preliminar hasta que un profesional con licencia las selle.')}</li>
      </ul>
    </div>
    <div class="shots">
      ${frame('floor-plan-main', L('Floor plan editor with wall dimensions, room labels, and properties for the selected exterior wall.', 'Editor de planos con cotas de muros, nombres de cuartos y propiedades del muro exterior seleccionado.'))}
      ${frame('model-3d-main', L('3D model of a two-story house and detached garage with the project tree of stories, sections and sheets.', 'Modelo 3D de una casa de dos pisos con cochera aparte y el árbol del proyecto con pisos, cortes y hojas.'))}
      ${frame('sheets-main', L('Sheet index for a plan set with architectural, HVAC, plumbing and electrical sheets, and sheet A1.01 first floor plan in a title block.', 'Índice de hojas con hojas arquitectónicas, de aire acondicionado, plomería y electricidad, y la hoja A1.01 del primer piso con su cuadro de rótulo.'))}
      <figure class="frame">${shot('sheet-m201', L('Printed sheet M2.01, first floor HVAC layout, with supply registers, airflow labels, a legend and a title block marked preliminary.', 'Hoja impresa M2.01, distribución de aire acondicionado del primer piso, con rejillas, flujos de aire, leyenda y cuadro de rótulo marcado como preliminar.'), { sizes: '(max-width: 960px) 100vw, 700px' })}</figure>
      <p class="small muted">${L('Sheet M2.01 as it prints, with title block and preliminary stamp.', 'Hoja M2.01 como se imprime, con cuadro de rótulo y sello de preliminar.')}</p>
    </div>
  </section>

  <section class="feature" id="takeoff" aria-labelledby="f4">
    <div class="text">
      <span class="kicker">${L('Estimate', 'Estimar')}</span>
      <h2 id="f4">${L('Whole-house takeoff and cost forecasts', 'Cuantificación de toda la casa y proyección de costos')}</h2>
      <p>${L('The whole house, from a screw to the roof. Each line traces back to a zone on a color-coded markup, so anyone on the team can see what was counted and what was left out.', 'Toda la casa, desde un tornillo hasta el techo. Cada renglón se ubica en una zona de un marcado por colores, para que cualquiera del equipo vea qué se contó y qué se dejó fuera.')}</p>
      <ul class="ticks">
        <li>${L('Markup PDFs color-coded by zone.', 'PDF marcados por colores según la zona.')}</li>
        <li>${L('Export to Excel for suppliers.', 'Exportar a Excel para proveedores.')}</li>
        <li>${L('Material cost forecast at 6, 9 and 12 months, and a 14 month worst case.', 'Proyección de costo de material a 6, 9 y 12 meses, y un peor caso a 14 meses.')}</li>
        <li>${L('Marked AI-built and estimator-verified, with who verified it and when.', 'Marcada como hecha con IA y verificada por un estimador, con quién la verificó y cuándo.')}</li>
      </ul>
    </div>
    <div>${frame('takeoff-main', L('Takeoff with areas and perimeters, a joist layout markup in green, red and blue zones, and a legend listing member, spacing and count per zone.', 'Cuantificación con áreas y perímetros, marcado de viguetas en zonas verdes, rojas y azules, y leyenda con pieza, separación y cantidad por zona.'))}</div>
  </section>

  <section class="feature" id="deals" aria-labelledby="f5">
    <div class="text">
      <span class="kicker">${L('Decide', 'Decidir')}</span>
      <h2 id="f5">${L('Deal Analyzer', 'Analizador de negocios')}</h2>
      <p>${L('For new builds, flips, remodels, additions and build-to-rent. Pull comps to set the ARV, see the area trend score, and get profit, max offer and risk flags with a GO or NO-GO and the reason behind it.', 'Para obra nueva, flips, remodelaciones, ampliaciones y construir para rentar. Use comparables para fijar el ARV, vea la tendencia de la zona y obtenga ganancia, oferta máxima y alertas de riesgo con un VA o NO VA y la razón.')}</p>
      <ul class="ticks">
        <li>${L('Profit at 6, 9 and 12 months, and at a 14 month worst case.', 'Ganancia a 6, 9 y 12 meses, y en un peor caso a 14 meses.')}</li>
        <li>${L('Finish packages feed straight into the deal, so an upgrade shows its effect on margin.', 'Los paquetes de acabados pasan directo al negocio, así que una mejora muestra su efecto en el margen.')}</li>
      </ul>
      <p class="note">${L('Try the free <a href="deal-calculator.html">deal calculator</a> for a quick version of the math.', 'Pruebe la <a href="deal-calculator.html">calculadora de negocios</a> gratis para una versión rápida de los números.')}</p>
    </div>
    <div>${frame('projects-main', L('Projects list across Dallas-Fort Worth with stage, compliance status and next gate for each project, including a fix and flip in feasibility.', 'Lista de proyectos en Dallas-Fort Worth con etapa, estado de cumplimiento y siguiente paso de cada uno, incluido un flip en factibilidad.'))}</div>
  </section>

  <section class="feature" id="structure" aria-labelledby="f6">
    <div class="text">
      <span class="kicker">${L('Decide', 'Decidir')}</span>
      <h2 id="f6">${L('Structure check and ways to make it bigger', 'Revisión de estructura y formas de ampliar')}</h2>
      <p>${L('Before you promise a client an open kitchen or a second story, check the foundation, framing and rafters. Each check comes back pass or fail.', 'Antes de prometerle al cliente una cocina abierta o un segundo piso, revise la cimentación, el entramado y las vigas de techo. Cada revisión sale pasa o no pasa.')}</p>
      <ul class="ticks">
        <li>${L('Expansion options show how to make the house bigger, each with a zoning check.', 'Las opciones para ampliar muestran cómo hacer la casa más grande, cada una con revisión de zonificación.')}</li>
      </ul>
      <p class="note"><strong>${L('Preliminary only.', 'Solo preliminar.')}</strong> ${L('A Texas licensed professional engineer must design and seal the structure.', 'Un ingeniero profesional con licencia en Texas debe diseñar y sellar la estructura.')}</p>
    </div>
    <div>${frame('model-walls-main', L('3D view of first floor walls built from the drawn floor plan.', 'Vista 3D de los muros del primer piso hecha desde el plano dibujado.'))}</div>
  </section>

  <section class="feature" id="site" aria-labelledby="f7">
    <div class="text">
      <span class="kicker">${L('Decide', 'Decidir')}</span>
      <h2 id="f7">${L('Site checks', 'Revisión del terreno')}</h2>
      <p>${L('Look up the parcel number, check the house against setbacks, height and lot coverage, see which way it faces and how many hours of sun the yard gets through the year.', 'Busque el número de parcela, revise la casa contra restricciones, altura y ocupación del lote, vea hacia dónde da y cuántas horas de sol recibe el patio durante el año.')}</p>
      <ul class="ticks">
        <li>${L('Zoning clearance check against district rules.', 'Revisión de zonificación contra las reglas del distrito.')}</li>
        <li>${L('Sun hours for the rear yard through the day, on key dates of the year.', 'Horas de sol en el patio durante el día, en fechas clave del año.')}</li>
        <li>${L('Confirm against the adopted code before you submit.', 'Confirme con el código vigente antes de meter el permiso.')}</li>
      </ul>
    </div>
    <div>${frame('site-main', L('Site view with the zoning envelope drawn around the house and a sun hours chart.', 'Vista del terreno con la envolvente de zonificación y una gráfica de horas de sol.'))}</div>
  </section>

  <section class="feature" id="selections" aria-labelledby="f8">
    <div class="text">
      <span class="kicker">${L('Decide', 'Decidir')}</span>
      <h2 id="f8">${L('Finish selections in 3D', 'Acabados en 3D')}</h2>
      <p>${L('Show the client countertops, cabinets, sinks, faucets, flooring, backsplash, paint and lighting in a 3D room, with Good, Better and Best prices side by side. The client approves in the app and the selection locks.', 'Muéstrele al cliente cubiertas, gabinetes, tarjas, llaves, pisos, salpicadero, pintura e iluminación en un cuarto 3D, con precios Bueno, Mejor y Superior lado a lado. El cliente aprueba en la app y la selección queda fija.')}</p>
      <ul class="ticks">
        <li>${L('Installed prices per option, by room.', 'Precio instalado por opción, por cuarto.')}</li>
        <li>${L('Approved selections flow into the takeoff and the deal.', 'Los acabados aprobados pasan a la cuantificación y al negocio.')}</li>
      </ul>
    </div>
    <div class="shots">
      ${frame('selections-main', L('Countertop options for a kitchen: laminate, maple butcher block, speckled granite and white quartz, each with an installed price and a Good or Better tag, beside a 3D kitchen.', 'Opciones de cubierta para la cocina: laminado, bloque de maple, granito moteado y cuarzo blanco, cada una con precio instalado y etiqueta Bueno o Mejor, junto a una cocina en 3D.'))}
      <div class="shots two">
        <figure>${shot('kitchen-standard', L('Kitchen in 3D with standard finishes.', 'Cocina en 3D con acabados estándar.'), { sizes: '(max-width: 720px) 100vw, 360px' })}<figcaption>${L('Standard package', 'Paquete estándar')}</figcaption></figure>
        <figure>${shot('kitchen-premium', L('Same kitchen with a marble waterfall island, natural wood cabinets and brass fixtures.', 'La misma cocina con isla de mármol en cascada, gabinetes de madera natural y accesorios de latón.'), { sizes: '(max-width: 720px) 100vw, 360px' })}<figcaption>${L('Premium package', 'Paquete superior')}</figcaption></figure>
      </div>
    </div>
  </section>

  <section class="feature" id="jobs" aria-labelledby="f9">
    <div class="text">
      <span class="kicker">${L('Build', 'Construir')}</span>
      <h2 id="f9">${L('Permits, insurance, POs and the schedule', 'Permisos, seguros, compras y calendario')}</h2>
      <p>${L('Every project tracks its permits, licenses and certificates of insurance. Hard gates mean a purchase order cannot release until the permit is issued and the vendor certificate is current. An admin override is there for the exceptions.', 'Cada proyecto controla sus permisos, licencias y certificados de seguro. Con los candados, una orden de compra no se libera hasta que el permiso esté emitido y el certificado del proveedor esté vigente. Para las excepciones, un administrador puede liberarla.')}</p>
      <ul class="ticks">
        <li>${L('POs to vendors with start notices.', 'Órdenes de compra a proveedores con aviso de inicio.')}</li>
        <li>${L('Calendar with late and running-behind alerts.', 'Calendario con alertas de atraso.')}</li>
        <li>${L('A dashboard ordered by consequence: what is blocking work comes first.', 'Un panel ordenado por consecuencia: primero lo que está deteniendo la obra.')}</li>
      </ul>
    </div>
    <div class="shots">
      ${frame('compliance-main', L('Compliance tab with blocked purchase orders and permit statuses.', 'Pestaña de cumplimiento con órdenes de compra bloqueadas y estado de permisos.'))}
      ${frame('dashboard-main', L('Dashboard with counts of active projects, pending permits, expiring certificates, open RFIs and deals in screening.', 'Panel con proyectos activos, permisos pendientes, certificados por vencer, RFIs abiertos y negocios en revisión.'))}
    </div>
  </section>

  <section class="feature" id="field" aria-labelledby="f10">
    <div class="text">
      <span class="kicker">${L('Build', 'Construir')}</span>
      <h2 id="f10">${L('Daily logs, punch lists, job costing and closeout', 'Bitácora, pendientes, costos de obra y cierre')}</h2>
      <p>${L('Daily logs, punch lists, job costing and closeout live on the same project as the plans and the estimate, so the field and the office look at the same job.', 'La bitácora diaria, la lista de pendientes, los costos de obra y el cierre viven en el mismo proyecto que los planos y el estimado, así que la obra y la oficina ven el mismo trabajo.')}</p>
    </div>
    <div>
      <table class="spec">
        <thead><tr><th scope="col">${L('Where it runs', 'Dónde funciona')}</th><th scope="col">${L('Details', 'Detalles')}</th></tr></thead>
        <tbody>
          <tr><th scope="row">Web</th><td data-label="${L('Details', 'Detalles')}">${L('Office work: plans, takeoff, deals, sheets, dashboards.', 'Trabajo de oficina: planos, cuantificación, negocios, hojas, paneles.')}</td></tr>
          <tr><th scope="row">iPhone</th><td data-label="${L('Details', 'Detalles')}">${L('Field work, plus LiDAR scanning on Pro models.', 'Trabajo en obra, más escaneo LiDAR en modelos Pro.')}</td></tr>
          <tr><th scope="row">Android</th><td data-label="${L('Details', 'Detalles')}">${L('Field work, with photo and scale card measuring.', 'Trabajo en obra, con medición por foto y tarjeta de escala.')}</td></tr>
          <tr><th scope="row">${L('Languages', 'Idiomas')}</th><td data-label="${L('Details', 'Detalles')}">${L('English and Spanish, chosen by each user.', 'Inglés y español, a elección de cada usuario.')}</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</div>

<section class="section dark on-dark beta-band" aria-labelledby="beta-title">
  <div class="wrap">
    <div>
      <h2 id="beta-title">${L('See it on your own project.', 'Véalo con su propio proyecto.')}</h2>
      <p class="lede">${L('Founding members bring a real plan set or a real deal and use the app free during the private beta.', 'Los miembros fundadores traen un juego de planos o un negocio real y usan la app gratis durante la beta privada.')}</p>
    </div>
    <div><a class="btn btn-primary" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a></div>
  </div>
</section>
`;
  },
};
