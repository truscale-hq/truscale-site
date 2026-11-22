export default {
  slug: 'index',
  nav: 'index',
  description: {
    en: 'Read a plan set, measure a house with your phone, take off every material, check the deal and run the job. Software for builders, remodelers, flippers and developers in Dallas-Fort Worth.',
    es: 'Lea un juego de planos, mida una casa con su teléfono, cuantifique todo el material, revise el negocio y lleve la obra. Software para constructores, remodeladores, inversionistas y desarrolladores en Dallas-Fort Worth.',
  },
  body: ({ L, B, shot, frame }) => `
<section class="hero on-dark" aria-labelledby="hero-title">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <h1 id="hero-title">${L('From the plan set to the punch list, in one app.', 'Del juego de planos a la lista de pendientes, en una sola app.')}</h1>
        <p class="lede">${L(
          `${B} reads your plans, measures the house with your phone, takes off every material from a screw to the roof, and tracks permits, POs and the schedule until closeout. Built for builders, remodelers, flippers and developers in Dallas-Fort Worth.`,
          `${B} lee sus planos, mide la casa con su teléfono, cuantifica todo el material desde un tornillo hasta el techo y da seguimiento a permisos, órdenes de compra y calendario hasta el cierre de obra. Hecho para constructores, remodeladores, inversionistas y desarrolladores en Dallas-Fort Worth.`,
        )}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a>
          <a class="btn btn-secondary" href="features.html">${L('See the features', 'Ver las funciones')}</a>
        </div>
      </div>
      <dl class="titleblock" aria-label="${L('Product facts', 'Datos del producto')}">
        <div><dt>${L('Status', 'Estado')}</dt><dd>${L('Private beta', 'Beta privada')}</dd></div>
        <div><dt>${L('Market', 'Mercado')}</dt><dd>DFW</dd></div>
        <div><dt>${L('Runs on', 'Funciona en')}</dt><dd>Web, iPhone, Android</dd></div>
        <div><dt>${L('Language', 'Idioma')}</dt><dd>English, español</dd></div>
      </dl>
    </div>
    <div class="hero-stage">
      <div class="devices">
        <div class="dim" aria-hidden="true"><i></i><i></i><span>${L('One project record, office to field', 'Un solo expediente, de la oficina a la obra')}</span></div>
        <div class="laptop">
          <div class="screen">${shot('dashboard', L('Dashboard showing active projects, permits pending, expiring insurance certificates, open RFIs and a list of items holding work, ordered by consequence.', 'Panel con proyectos activos, permisos pendientes, certificados de seguro por vencer, RFIs abiertos y una lista de pendientes que detienen la obra.'), { eager: true, sizes: '(max-width: 720px) 100vw, 900px' })}</div>
          <div class="base" aria-hidden="true"></div>
        </div>
        <div class="phone">${shot('floor-plan-phone', L('Floor plan with dimensions drawn on a phone.', 'Plano de planta con cotas dibujado en un teléfono.'), { eager: true, sizes: '250px' })}</div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="problem-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="problem-title">${L('Most jobs still run on five apps, a spreadsheet and a group text.', 'La mayoría de las obras todavía se llevan con cinco apps, una hoja de cálculo y un chat de grupo.')}</h2>
      <p>${L(`Plans live in one place, the takeoff in another, the deal math on a napkin and the permit status in somebody's head. ${B} keeps all of it on one project.`, `Los planos en un lado, la cuantificación en otro, los números del negocio en una servilleta y el estado del permiso en la cabeza de alguien. ${B} junta todo en un solo proyecto.`)}</p>
    </div>
    <div class="fixes">
      <div class="fix">
        <h3>${L('Counting off a PDF by hand', 'Contar a mano sobre un PDF')}</h3>
        <p>${L('Upload the plan set. The AI Plan Reader pulls dimensions, rooms and schedules from the sheets and flags what does not match. Your estimator checks the numbers before anything goes out.', 'Suba el juego de planos. El lector de planos con IA saca cotas, cuartos y tablas de las hojas y marca lo que no cuadra. Su estimador revisa los números antes de que salga cualquier cosa.')}</p>
      </div>
      <div class="fix">
        <h3>${L('Field measurements on the back of a receipt', 'Medidas de campo en la parte de atrás de un recibo')}</h3>
        <p>${L('Scan the house with a Pro iPhone or iPad, or use a photo and a scale card on any other phone. A tape check on one wall confirms the scan before anything is ordered.', 'Escanee la casa con un iPhone o iPad Pro, o use una foto y una tarjeta de escala en cualquier otro teléfono. Una revisión con cinta en una pared confirma el escaneo antes de pedir material.')}</p>
      </div>
      <div class="fix">
        <h3>${L('A deal that looked good until month twelve', 'Un negocio que se veía bien hasta el mes doce')}</h3>
        <p>${L('The Deal Analyzer shows profit, max offer and risk flags with a GO or NO-GO. Material costs are forecast at 6, 9 and 12 months, plus a 14 month worst case.', 'El analizador de negocios muestra la ganancia, la oferta máxima y las alertas de riesgo con un VA o NO VA. Los costos de material se proyectan a 6, 9 y 12 meses, más un peor caso a 14 meses.')}</p>
      </div>
      <div class="fix">
        <h3>${L('A sub on site with no insurance on file', 'Un subcontratista en la obra sin seguro en el expediente')}</h3>
        <p>${L('Permits and certificates of insurance are tracked on every project. A purchase order does not release until the permit is issued and the vendor certificate is current.', 'Los permisos y certificados de seguro se controlan en cada proyecto. Una orden de compra no se libera hasta que el permiso esté emitido y el certificado del proveedor esté vigente.')}</p>
      </div>
    </div>
  </div>
</section>

<section class="section-tight" aria-labelledby="workflow-title" id="workflow">
  <div class="wrap">
    <div class="section-head" style="margin-bottom:28px">
      <h2 id="workflow-title">${L('Plan, estimate, decide, build.', 'Planear, estimar, decidir, construir.')}</h2>
      <p>${L('The same project moves through four stages. Each one picks up what the last one finished, so nobody types the same house twice.', 'El mismo proyecto pasa por cuatro etapas. Cada una toma lo que terminó la anterior, así que nadie captura la misma casa dos veces.')}</p>
    </div>
    <nav class="phases" aria-label="${L('Workflow stages', 'Etapas')}">
      <a href="#plan"><b>${L('Plan', 'Planear')}</b><span>${L('Plans, measuring, drawings', 'Planos, medidas, dibujos')}</span></a>
      <a href="#estimate"><b>${L('Estimate', 'Estimar')}</b><span>${L('Takeoff and forecasts', 'Cuantificación y proyecciones')}</span></a>
      <a href="#decide"><b>${L('Decide', 'Decidir')}</b><span>${L('Deal, structure, site, finishes', 'Negocio, estructura, terreno, acabados')}</span></a>
      <a href="#build"><b>${L('Build', 'Construir')}</b><span>${L('Permits, POs, schedule, closeout', 'Permisos, compras, calendario, cierre')}</span></a>
    </nav>
    <article class="stage" id="plan">
      <div>
        <span class="step">${L('Stage 1', 'Etapa 1')}</span>
        <h3>${L('Plan: get the house into the system right.', 'Planear: meter la casa al sistema bien.')}</h3>
        <p class="muted">${L('Start from a plan set, a phone scan or a blank lot.', 'Empiece con un juego de planos, un escaneo con el teléfono o un lote vacío.')}</p>
        <ul class="ticks">
          <li><strong>${L('AI Plan Reader.', 'Lector de planos con IA.')}</strong> ${L('Reads dimensions, rooms and schedules, cross-checks dates and revisions between sheets, and an estimator verifies.', 'Lee cotas, cuartos y tablas, compara fechas y revisiones entre hojas, y un estimador verifica.')}</li>
          <li><strong>${L('Floor plans with dimensions', 'Planos de planta con cotas')}</strong> ${L('and a 3D model built from them.', 'y un modelo 3D hecho a partir de ellos.')}</li>
          <li><strong>${L('Construction sheets', 'Hojas de construcción')}</strong> ${L('A, M, P, E and S, with title blocks and schedules.', 'A, M, P, E y S, con cuadro de rótulo y tablas.')}</li>
        </ul>
      </div>
      ${frame('plans-focus', L('Plan Reader results: four files read, cross-check flags for a date mismatch and blank revision blocks, and each sheet marked confirmed or not readable.', 'Resultados del lector de planos: cuatro archivos leídos, alertas por fechas que no coinciden y bloques de revisión vacíos, y cada hoja marcada como confirmada o ilegible.'))}
    </article>

    <article class="stage flip" id="estimate">
      <div>
        <span class="step">${L('Stage 2', 'Etapa 2')}</span>
        <h3>${L('Estimate: every material, from a screw to the roof.', 'Estimar: todo el material, desde un tornillo hasta el techo.')}</h3>
        <ul class="ticks">
          <li><strong>${L('Whole-house takeoff', 'Cuantificación de toda la casa')}</strong> ${L('where every line traces back to a zone on the plan.', 'donde cada renglón se ubica en una zona del plano.')}</li>
          <li><strong>${L('Color-coded markup PDFs', 'PDF marcados por colores')}</strong> ${L('so the team sees what was counted and what was left out.', 'para que el equipo vea qué se contó y qué se dejó fuera.')}</li>
          <li><strong>${L('Excel export', 'Exportar a Excel')}</strong> ${L('for your supplier or your own pricing sheet.', 'para su proveedor o su propia hoja de precios.')}</li>
          <li><strong>${L('Cost forecasts', 'Proyección de costos')}</strong> ${L('at 6, 9 and 12 months, plus a 14 month worst case.', 'a 6, 9 y 12 meses, más un peor caso a 14 meses.')}</li>
        </ul>
      </div>
      ${frame('takeoff-focus', L('Takeoff screen: heated area, area under roof, wall perimeters and roof area, with a joist layout markup color-coded by zone and a legend of member sizes and spacing.', 'Pantalla de cuantificación: área calefaccionada, área bajo techo, perímetros de muros y área de techo, con un marcado del entramado de viguetas por colores y su leyenda de tamaños y separación.'))}
    </article>

    <article class="stage" id="decide">
      <div>
        <span class="step">${L('Stage 3', 'Etapa 3')}</span>
        <h3>${L('Decide: know if the deal works before you buy.', 'Decidir: sepa si el negocio funciona antes de comprar.')}</h3>
        <ul class="ticks">
          <li><strong>${L('Deal Analyzer', 'Analizador de negocios')}</strong> ${L('for new builds, flips, remodels, additions and build-to-rent: comps and ARV, area trend score, profit, max offer, risk flags, GO or NO-GO.', 'para obra nueva, flips, remodelaciones, ampliaciones y construir para rentar: comparables y ARV, tendencia de la zona, ganancia, oferta máxima, alertas de riesgo, VA o NO VA.')}</li>
          <li><strong>${L('Structure check and expansion options.', 'Revisión de estructura y opciones para ampliar.')}</strong> ${L('Foundation, framing and rafters pass or fail, and ways to make the house bigger with a zoning check.', 'Cimentación, entramado y vigas de techo pasa o no pasa, y formas de hacer la casa más grande con revisión de zonificación.')}</li>
          <li><strong>${L('Site', 'Terreno')}</strong>: ${L('zoning clearance, sun hours, which way the house faces, parcel number lookup.', 'zonificación, horas de sol, hacia dónde da la casa, búsqueda por número de parcela.')}</li>
          <li><strong>${L('Finish selections in 3D', 'Acabados en 3D')}</strong> ${L('with Good, Better and Best costs and client approval.', 'con costos Bueno, Mejor y Superior y aprobación del cliente.')}</li>
        </ul>
      </div>
      ${frame('site-focus', L('Site tab: 3D view of the house with its zoning envelope among neighboring houses, a zoning clearance check, and a sun hours chart for the rear yard.', 'Pestaña de terreno: vista 3D de la casa con su envolvente de zonificación entre las casas vecinas, revisión de zonificación y gráfica de horas de sol en el patio.'))}
    </article>

    <article class="stage flip" id="build">
      <div>
        <span class="step">${L('Stage 4', 'Etapa 4')}</span>
        <h3>${L('Build: nothing moves until the paperwork is clear.', 'Construir: nada avanza hasta que los papeles estén en orden.')}</h3>
        <ul class="ticks">
          <li><strong>${L('Permits and insurance', 'Permisos y seguros')}</strong> ${L('tracked on every project, with hard gates.', 'en cada proyecto, con candados.')}</li>
          <li><strong>${L('POs to vendors', 'Órdenes de compra a proveedores')}</strong> ${L('with start notices.', 'con aviso de inicio.')}</li>
          <li><strong>${L('Calendar', 'Calendario')}</strong> ${L('with late and running-behind alerts.', 'con alertas de atraso.')}</li>
          <li><strong>${L('Daily logs, punch lists, job costing and closeout.', 'Bitácora diaria, lista de pendientes, costos de obra y cierre.')}</strong></li>
        </ul>
      </div>
      ${frame('compliance-focus', L('Compliance tab: two purchase orders blocked because the building permit has not started and a vendor insurance certificate expired, with permits listed by status.', 'Pestaña de cumplimiento: dos órdenes de compra bloqueadas porque el permiso de construcción no ha iniciado y venció el certificado de seguro de un proveedor, con los permisos por estado.'))}
    </article>
  </div>
</section>

<section class="section paper" aria-labelledby="who-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="who-title">${L('Who it is for', 'Para quién es')}</h2>
      <p>${L('Small and mid-size teams that build, remodel or invest in houses in North Texas.', 'Equipos chicos y medianos que construyen, remodelan o invierten en casas en el norte de Texas.')}</p>
    </div>
    <div class="rows">
      <div class="row">
        <h3>${L('Home builders', 'Constructores de casas')}</h3>
        <p>${L('Spec and custom homes, and production lots. Keep plans, takeoffs, permits, POs and the schedule on one record per lot.', 'Casas para venta, a la medida y lotes en serie. Planos, cuantificación, permisos, compras y calendario en un solo expediente por lote.')}</p>
        <p class="first"><b>${L('Start with', 'Para empezar')}</b>${L('Plan Reader, takeoff, permit and insurance gates', 'Lector de planos, cuantificación, candados de permisos y seguros')}</p>
      </div>
      <div class="row">
        <h3>${L('Remodelers', 'Remodeladores')}</h3>
        <p>${L('Measure the existing house without a laser, draw the as-built, then show the client finishes in 3D with prices.', 'Mida la casa existente sin láser, dibuje cómo está y muéstrele al cliente los acabados en 3D con precio.')}</p>
        <p class="first"><b>${L('Start with', 'Para empezar')}</b>${L('Phone measuring, floor plans, finish selections', 'Medición con teléfono, planos, acabados')}</p>
      </div>
      <div class="row">
        <h3>${L('Flippers and investors', 'Inversionistas y flippers')}</h3>
        <p>${L('Run the numbers on a property before you make an offer, and see what happens to profit if the job runs long.', 'Haga los números de una propiedad antes de ofertar y vea qué pasa con la ganancia si la obra se alarga.')}</p>
        <p class="first"><b>${L('Start with', 'Para empezar')}</b>${L('Deal Analyzer, structure check, expansion options', 'Analizador de negocios, revisión de estructura, opciones para ampliar')}</p>
      </div>
      <div class="row">
        <h3>${L('Developers', 'Desarrolladores')}</h3>
        <p>${L('Check zoning, orientation and parcel data, compare build-to-rent and for-sale returns, and track every lot to closeout.', 'Revise zonificación, orientación y datos de la parcela, compare construir para rentar contra vender, y siga cada lote hasta el cierre.')}</p>
        <p class="first"><b>${L('Start with', 'Para empezar')}</b>${L('Site checks, Deal Analyzer, dashboards', 'Revisiones del terreno, analizador de negocios, paneles')}</p>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="measure-title" id="measure">
  <div class="wrap measure-grid">
    <div>
      <div class="section-head" style="margin-bottom:28px">
        <h2 id="measure-title">${L('Measure a house without a laser.', 'Mida una casa sin láser.')}</h2>
        <p>${L('Use the phone already in your pocket. The app picks the method your phone supports.', 'Use el teléfono que ya trae en la bolsa. La app escoge el método que su teléfono soporta.')}</p>
      </div>
      <table class="spec">
        <thead>
          <tr><th scope="col"><span class="visually-hidden">${L('Phone', 'Teléfono')}</span></th><th scope="col">${L('How it measures', 'Cómo mide')}</th><th scope="col">${L('What you do', 'Qué hace usted')}</th></tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">${L('Pro iPhone or iPad', 'iPhone o iPad Pro')}</th>
            <td data-label="${L('How it measures', 'Cómo mide')}">${L('LiDAR scan of each room', 'Escaneo LiDAR de cada cuarto')}</td>
            <td data-label="${L('What you do', 'Qué hace usted')}">${L('Walk the room slowly with the camera on the walls.', 'Recorra el cuarto despacio apuntando la cámara a los muros.')}</td>
          </tr>
          <tr>
            <th scope="row">${L('Other iPhones and Android phones', 'Otros iPhone y teléfonos Android')}</th>
            <td data-label="${L('How it measures', 'Cómo mide')}">${L('Photo plus a printed scale card', 'Foto más una tarjeta de escala impresa')}</td>
            <td data-label="${L('What you do', 'Qué hace usted')}">${L('Set the card against the wall and take the photo square on.', 'Ponga la tarjeta contra el muro y tome la foto de frente.')}</td>
          </tr>
          <tr>
            <th scope="row">${L('Any phone', 'Cualquier teléfono')}</th>
            <td data-label="${L('How it measures', 'Cómo mide')}">${L('Tape check', 'Revisión con cinta')}</td>
            <td data-label="${L('What you do', 'Qué hace usted')}">${L('Tape one wall and enter it. If the scan is off by more than the tolerance, the app asks for a new scan before anything is ordered.', 'Mida un muro con cinta y anótelo. Si el escaneo no cuadra dentro de la tolerancia, la app pide escanear otra vez antes de pedir material.')}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="phone static">${shot('floor-plan-phone', L('Measured floor plan on a phone, with room sizes and wall dimensions.', 'Plano medido en el teléfono, con tamaños de cuartos y cotas de muros.'), { sizes: '300px' })}</div>
    </div>
  </div>
</section>

<section class="section dark on-dark" aria-labelledby="es-title" lang="${L('en', 'es')}">
  <div class="wrap split">
    <div>
      <h2 id="es-title">${L('Your crew can run it in Spanish.', 'Su cuadrilla lo puede usar en español.')}</h2>
      <p class="lede">${L('The app works in English and Spanish. Each person picks a language, and the project stays the same for everyone, so the office and the crew look at the same job.', 'La app funciona en inglés y en español. Cada persona escoge su idioma y el proyecto es el mismo para todos, así que la oficina y la cuadrilla ven la misma obra.')}</p>
      <div class="btn-row"><a class="btn btn-secondary" href="${L('es/index.html', '../index.html')}" hreflang="${L('es', 'en')}">${L('Ver el sitio en español', 'See the site in English')}</a></div>
    </div>
    <div class="glossary" aria-label="${L('Examples of app terms in English and Spanish', 'Ejemplos de términos de la app en inglés y español')}">
      <div><span lang="en">Takeoff</span><b lang="es">Cuantificación</b></div>
      <div><span lang="en">Punch list</span><b lang="es">Lista de pendientes</b></div>
      <div><span lang="en">Daily log</span><b lang="es">Bitácora diaria</b></div>
      <div><span lang="en">Purchase order</span><b lang="es">Orden de compra</b></div>
      <div><span lang="en">Start notice</span><b lang="es">Aviso de inicio</b></div>
      <div><span lang="en">Running behind</span><b lang="es">Va atrasado</b></div>
      <div><span lang="en">Rough-in inspection</span><b lang="es">Inspección de obra negra</b></div>
      <div><span lang="en">Joist</span><b lang="es">Vigueta</b></div>
      <div><span lang="en">Closeout</span><b lang="es">Cierre de obra</b></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="tools-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="tools-title">${L('Free tools you can use today', 'Herramientas gratis que puede usar hoy')}</h2>
      <p>${L('No sign-up. They run in your browser and nothing you type leaves your device.', 'Sin registrarse. Funcionan en su navegador y nada de lo que escribe sale de su equipo.')}</p>
    </div>
    <div class="tool-links">
      <a href="deal-calculator.html"><h3>${L('Flip and build deal calculator', 'Calculadora de flips y obra nueva')}</h3><p>${L('Profit, margin, max offer by the 70% rule and at your target margin, with a GO, CAUTION or NO-GO.', 'Ganancia, margen, oferta máxima por la regla del 70% y con su margen meta, con VA, CUIDADO o NO VA.')}</p></a>
      <a href="house-facing.html"><h3>${L('Which way does my house face?', '¿Hacia dónde da mi casa?')}</h3><p>${L('Use your phone compass or a dial to get the facing, the backyard direction and a Texas sun note.', 'Use la brújula del teléfono o un dial para saber la orientación, hacia dónde da el patio y una nota del sol en Texas.')}</p></a>
      <a href="span-check.html"><h3>${L('Joist and rafter span check', 'Claros de viguetas y vigas de techo')}</h3><p>${L('Bending, shear and deflection for common lumber sizes. A quick reference, not a design.', 'Flexión, cortante y deflexión para medidas comunes de madera. Una referencia rápida, no un diseño.')}</p></a>
    </div>
  </div>
</section>

<section class="section dark on-dark beta-band" aria-labelledby="beta-title">
  <div class="wrap">
    <div>
      <h2 id="beta-title">${L('Become a founding member.', 'Sea miembro fundador.')}</h2>
      <p class="lede">${L('We are opening a private beta to a small group of builders, remodelers and investors in Dallas-Fort Worth. Founding members use it free during the beta and keep a lower price for life.', 'Abrimos una beta privada para un grupo chico de constructores, remodeladores e inversionistas en Dallas-Fort Worth. Los miembros fundadores la usan gratis durante la beta y conservan un precio más bajo de por vida.')}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a>
        <a class="btn btn-secondary" href="pricing.html">${L('How pricing works', 'Cómo funcionan los precios')}</a>
      </div>
    </div>
    <ul class="facts">
      <li>${L('Seats', 'Lugares')}<b>${L('10 to 15 DFW users', '10 a 15 usuarios en DFW')}</b></li>
      <li>${L('Length', 'Duración')}<b>${L('About 60 to 90 days', 'Unos 60 a 90 días')}</b></li>
      <li>${L('Cost during beta', 'Costo durante la beta')}<b>${L('Free', 'Gratis')}</b></li>
      <li>${L('After launch', 'Después del lanzamiento')}<b>${L('Locked low price for life', 'Precio bajo fijo de por vida')}</b></li>
    </ul>
  </div>
</section>
`,
};
