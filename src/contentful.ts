// src/services/cms/contentful.ts

import type { Locale } from '~/services/core/locale'
import type { CmsBlock, CmsListQuery, CmsListItem } from './types'
import type { ContentBlock, StoredLocalizedBlock } from './internal'
import {
  CONTENTFUL_CONTENT_STORE,
  CONTENTFUL_LEGAL_STORE,
} from './contentfulStore'

/**
 * Contingut “general” (hero, about, blocs informatius, etc.).
 * Mantén aquí EXACTAMENT els mateixos textos que ja tens ara.
 */
// export const MOCK_CONTENT: Record<string, Record<Locale, StoredLocalizedBlock>> = {
//   'homepage-hero': {
//     ca: {
//       title: 'Fornejant Tradició, sabor i Felicitat',
//       body: 'Desde que vam començar, som sinonim de qualitat artesanal. Descubreix els nostres productes.',
//     },
//     es: {
//       title: 'Horneando Tradición, Sabor y Felicidad',
//       body: 'Desde hace tres generaciones, nuestra panadería es sinónimo de calidad artesana. Descubra nuestros panes de masa madre y pastelería diaria.',
//     },
//     en: {
//       title: 'Baking Tradition, Flavor, and Happiness',
//       body: 'For three generations, our bakery has been synonymous with artisan quality. Discover our sourdough breads and daily pastries.',
//     },
//   },
//   'about-us': {
//     ca: {
//       title: 'Som així',
//       body: 'Nomes utilitzem ingredients locals y técniques lentes per assegurar el millor resultat.',
//     },
//     es: {
//       title: 'Nuestra Filosofía',
//       body: 'Usamos solo ingredientes locales y técnicas lentas para asegurar el mejor sabor y la mejor digestión.',
//     },
//     en: {
//       title: 'Our Philosophy',
//       body: 'We only use local ingredients and slow techniques to ensure the best flavor and best digestion.',
//     },
//   },
//   'blog': {
//     ca: {
//       title: 'El nostre blog',
//       body: `
//   <h2>Benvingut al blog de la pastisseria</h2>
//   <p>
//     Aquí compartim secrets del nostre obrador, consells per conservar millor els productes,
//     curiositats del món de la pastisseria i històries que formen part del nostre dia a dia.
//   </p>

//   <h3>🥐 Com fem els nostres croissants de mantega</h3>
//   <p>
//     El laminat és la clau del croissant perfecte. Fem servir mantega de primera qualitat
//     i una tècnica lenta que respecta el temps de repòs de la massa.
//   </p>

//   <h3>🎂 Guia per encarregar un pastís d'aniversari</h3>
//   <p>
//     Explica’ns els teus gustos i et prepararem una proposta personalitzada.
//     Disposem d’opcions per a totes les edats, formats i intoleràncies.
//   </p>

//   <h3>🍞 El nostre pa de massa mare</h3>
//   <p>
//     Fermentar amb massa mare dóna un resultat més digestiu, saborós
//     i amb una textura molt característica. Descobreix com ho preparem.
//   </p>
//       `,
//     },
//     es: {
//       title: 'Nuestro blog',
//       body: `
//   <h2>Bienvenido al blog de la pastelería</h2>
//   <p>
//     Aquí compartimos secretos de nuestro obrador, consejos para conservar mejor los productos,
//     curiosidades del mundo de la pastelería e historias del día a día.
//   </p>

//   <h3>🥐 Cómo elaboramos nuestros croissants de mantequilla</h3>
//   <p>
//     El laminado es la clave del croissant perfecto. Usamos mantequilla de alta calidad
//     y una técnica lenta que respeta los tiempos de reposo de la masa.
//   </p>

//   <h3>🎂 Guía para encargar una tarta de cumpleaños</h3>
//   <p>
//     Cuéntanos tus gustos y te prepararemos una propuesta a medida.
//     Tenemos opciones para todas las edades, tamaños e intolerancias.
//   </p>

//   <h3>🍞 Nuestro pan de masa madre</h3>
//   <p>
//     Fermentar con masa madre produce un pan más digestivo, sabroso
//     y con una textura única. Descubre cómo lo hacemos.
//   </p>
//       `,
//     },
//     en: {
//       title: 'Our Blog',
//       body: `
//   <h2>Welcome to our bakery blog</h2>
//   <p>
//     Here we share secrets from our workshop, tips to keep products fresh longer,
//     pastry curiosities and stories from our daily life.
//   </p>

//   <h3>🥐 How we make our butter croissants</h3>
//   <p>
//     Lamination is the key to a perfect croissant. We use premium butter
//     and a slow technique that respects the resting time of the dough.
//   </p>

//   <h3>🎂 Guide to ordering a birthday cake</h3>
//   <p>
//     Tell us what you like and we will prepare a personalised proposal.
//     We offer options for all ages, shapes and dietary needs.
//   </p>

//   <h3>🍞 Our sourdough bread</h3>
//   <p>
//     Sourdough fermentation creates a more digestible, flavourful bread
//     with a unique texture. Learn how we prepare it.
//   </p>
//       `,
//     },
//   },
//   'about-page': {
//     ca: {
//       title: 'La nostra història',
//       body: `
// <h2>Tradició que neix al poble</h2>
// <p>
//   La Pastisseria Piella és un obrador familiar que ha mantingut la mateixa manera de fer 
//   des de fa diverses generacions. Creiem en el temps, en les fermentacions lentes i en 
//   el respecte pels ingredients.
// </p>

// <h3>🍞 El que fem, ho fem com abans</h3>
// <p>
//   No tenim pressa quan treballem la massa. Les nostres receptes provenen de llibres vells, 
//   de llibres tacats de farina i d’històries explicades entre taulells de fusta.
// </p>

// <h3>🥐 Perquè la qualitat necessita temps</h3>
// <p>
//   A l’era de la immediatesa, nosaltres continuem creient en deixar reposar un croissant 
//   tota la nit, o en fer una massa mare viva que ens acompanya des de fa anys.
// </p>

// <h3>🎂 Un llegat que volem compartir</h3>
// <p>
//   Cada producte que surt del nostre obrador representa una petita part del nostre llegat. 
//   I cada client que el gaudeix es converteix, d’alguna manera, en part de la nostra història.
// </p>
//     `,
//     },
//     es: {
//       title: 'Nuestra historia',
//       body: `
// <h2>Tradición que nace en el pueblo</h2>
// <p>
//   La Pastelería Piella es un obrador familiar que ha mantenido la misma forma de trabajar 
//   durante varias generaciones. Creemos en el tiempo, en las fermentaciones lentas y en el 
//   respeto por los ingredientes.
// </p>

// <h3>🍞 Lo que hacemos, lo hacemos como antes</h3>
// <p>
//   No tenemos prisa cuando trabajamos la masa. Nuestras recetas provienen de libros antiguos, 
//   manchados de harina y llenos de historias contadas en mostradores de madera.
// </p>

// <h3>🥐 Porque la calidad necesita tiempo</h3>
// <p>
//   En la era de la inmediatez, seguimos creyendo en dejar reposar un croissant toda la noche 
//   o en mantener una masa madre viva que nos acompaña desde hace años.
// </p>

// <h3>🎂 Un legado que queremos compartir</h3>
// <p>
//   Cada producto que sale de nuestro obrador representa una pequeña parte de nuestro legado. 
//   Y cada cliente que lo disfruta se convierte, de algún modo, en parte de nuestra historia.
// </p>
//     `,
//     },
//     en: {
//       title: 'Our Story',
//       body: `
// <h2>Tradition born in our hometown</h2>
// <p>
//   Piella Bakery is a family workshop that has preserved the same way of working for several 
//   generations. We believe in time, slow fermentation and respect for good ingredients.
// </p>

// <h3>🍞 We make things the way they used to be made</h3>
// <p>
//   We are never in a hurry when working with dough. Our recipes come from old notebooks, 
//   stained with flour and filled with stories told around wooden counters.
// </p>

// <h3>🥐 Because quality needs time</h3>
// <p>
//   In an age of immediacy, we still believe in letting a croissant rest overnight 
//   and in keeping a living sourdough that has been with us for many years.
// </p>

// <h3>🎂 A legacy we want to share</h3>
// <p>
//   Every product that leaves our bakery carries a piece of our heritage. 
//   And every customer who enjoys it becomes, in a way, part of our story.
// </p>
//     `,
//     },
//   },
// }

/**
 * Contingut legal multi-idioma (privacy, terms, cookies…).
 * Manté els tipus legacy de ContentBlock (interns).
 */
// export const LEGAL_MOCK_CONTENT: Record<string, Record<Locale, ContentBlock>> = {
//   'legal-privacy-policy': {
//     ca: {
//       slug: 'legal-privacy-policy',
//       title: 'Política de privacitat',
//       body: `
// <p>
//   Aquesta Política de privacitat descriu com es recullen, utilitzen i protegeixen
//   les dades personals de les persones usuàries d’aquest lloc web i, en el seu cas,
//   de la botiga en línia associada.
// </p>

// <h2>1. Responsable del tractament</h2>
// <p>
//   El responsable del tractament de les dades personals és el titular del negoci
//   (d’ara endavant, “el Responsable”). Les dades de contacte es facilitaran a petició
//   del propietari del negoci i s’inclouran en aquesta secció quan el projecte passi a
//   entorn de producció.
// </p>

// <h2>2. Tipus de dades que es poden tractar</h2>
// <p>
//   En funció de l’ús que facis del web, es poden tractar les següents categories de dades:
// </p>
// <ul>
//   <li>Dades identificatives: nom i cognoms.</li>
//   <li>Dades de contacte: adreça de correu electrònic, telèfon, adreça postal.</li>
//   <li>Dades de navegació: adreça IP, identificadors de dispositiu, idioma del navegador, pàgines visitades.</li>
//   <li>Dades de compra: productes seleccionats, imports, adreça d’enviament i facturació (gestionats principalment a través de Shopify).</li>
// </ul>

// <h2>3. Finalitats del tractament</h2>
// <p>Les dades es poden utilitzar per a les finalitats següents:</p>
// <ul>
//   <li>Gestionar les comandes i pagaments realitzats a la botiga en línia.</li>
//   <li>Respondre consultes enviades mitjançant formularis de contacte.</li>
//   <li>Enviar comunicacions relacionades amb el servei (per exemple, confirmació de comanda).</li>
//   <li>Si s’ha obtingut el consentiment, enviar comunicacions comercials o butlletins.</li>
//   <li>Analitzar de forma agregada l’ús del web per millorar els serveis i l’experiència d’usuari.</li>
// </ul>

// <h2>4. Base jurídica del tractament</h2>
// <p>La base que legitima el tractament de les dades pot ser:</p>
// <ul>
//   <li>L’execució d’un contracte de venda o la gestió de comandes.</li>
//   <li>El compliment d’obligacions legals (fiscals, comptables, de consum).</li>
//   <li>El consentiment exprés de la persona usuària, en aquells casos en què sigui necessari (per exemple, subscripció a newsletter o ús de cookies no essencials).</li>
//   <li>L’interès legítim per millorar el funcionament del web i prevenir usos fraudulents.</li>
// </ul>

// <h2>5. Cessió de dades i encarregats de tractament</h2>
// <p>
//   Les dades es poden comunicar a tercers quan sigui necessari per a la prestació del servei:
// </p>
// <ul>
//   <li>Plataforma de comerç electrònic (Shopify) per a la gestió de productes, comandes i clients.</li>
//   <li>Proveïdors de serveis de pagament (passarel·les bancàries, Stripe, etc.).</li>
//   <li>Proveïdors de serveis tècnics (hosting, analítica, enviament de correus transaccionals o newsletters).</li>
//   <li>Administració pública i organismes oficials, quan sigui necessari per al compliment d’obligacions legals.</li>
// </ul>

// <h2>6. Termini de conservació</h2>
// <p>
//   Les dades personals es conservaran durant el temps necessari per complir la finalitat per a la qual van ser recollides i, posteriorment, durant els terminis legalment exigits
//   (per exemple, en matèria fiscal o de responsabilitat civil).
// </p>

// <h2>7. Drets de les persones interessades</h2>
// <p>
//   Les persones usuàries poden exercir els drets d’accés, rectificació, supressió, oposició, limitació del tractament i portabilitat de les seves dades, en els termes previstos
//   per la normativa vigent.
// </p>
// <p>
//   Per exercir aquests drets, caldrà dirigir una sol·licitud al correu electrònic o adreça postal que el Responsable indicarà quan el servei es trobi en producció.
// </p>

// <h2>8. Cookies</h2>
// <p>
//   Aquest lloc web pot utilitzar cookies tècniques imprescindibles per al seu funcionament i, si la persona usuària ho accepta, cookies analítiques o de màrqueting.
//   Per a més informació, consulta la <a href="/cookies">Política de cookies</a>.
// </p>

// <h2>9. Canvis en la política de privacitat</h2>
// <p>
//   El Responsable es reserva el dret a actualitzar aquesta política per adaptar-la a canvis legislatius o a la natura del servei. En cas de canvis rellevants, s’informarà
//   de forma clara a través del web.
// </p>
//       `,
//     },
//     es: {
//       slug: 'legal-privacy-policy',
//       title: 'Política de privacidad',
//       body: `
// <p>
//   Esta Política de privacidad describe cómo se recogen, utilizan y protegen los datos personales
//   de las personas usuarias de este sitio web y, en su caso, de la tienda online asociada.
// </p>

// <h2>1. Responsable del tratamiento</h2>
// <p>
//   El responsable del tratamiento de los datos personales es el titular del negocio (en adelante, “el Responsable”).
//   Los datos de contacto se facilitarán a petición del propietario del negocio y se incluirán en esta sección cuando
//   el proyecto pase a entorno de producción.
// </p>

// <h2>2. Tipos de datos que pueden tratarse</h2>
// <p>
//   En función del uso que hagas del sitio web, se pueden tratar las siguientes categorías de datos:
// </p>
// <ul>
//   <li>Datos identificativos: nombre y apellidos.</li>
//   <li>Datos de contacto: dirección de correo electrónico, teléfono, dirección postal.</li>
//   <li>Datos de navegación: dirección IP, identificadores de dispositivo, idioma del navegador, páginas visitadas.</li>
//   <li>Datos de compra: productos seleccionados, importes, dirección de envío y facturación (gestionados principalmente a través de Shopify).</li>
// </ul>

// <h2>3. Finalidades del tratamiento</h2>
// <p>Los datos pueden utilizarse para las siguientes finalidades:</p>
// <ul>
//   <li>Gestionar los pedidos y pagos realizados en la tienda online.</li>
//   <li>Responder a consultas enviadas mediante formularios de contacto.</li>
//   <li>Enviar comunicaciones relacionadas con el servicio (por ejemplo, confirmación de pedido).</li>
//   <li>Si se ha obtenido el consentimiento, enviar comunicaciones comerciales o boletines.</li>
//   <li>Analizar de forma agregada el uso del sitio web para mejorar los servicios y la experiencia de usuario.</li>
// </ul>

// <h2>4. Base jurídica del tratamiento</h2>
// <p>La base que legitima el tratamiento de los datos puede ser:</p>
// <ul>
//   <li>La ejecución de un contrato de venta o la gestión de pedidos.</li>
//   <li>El cumplimiento de obligaciones legales (fiscales, contables, de consumo).</li>
//   <li>El consentimiento expreso de la persona usuaria, en los casos en que sea necesario (por ejemplo, suscripción a newsletter o uso de cookies no esenciales).</li>
//   <li>El interés legítimo para mejorar el funcionamiento del sitio web y prevenir usos fraudulentos.</li>
// </ul>

// <h2>5. Cesión de datos y encargados del tratamiento</h2>
// <p>
//   Los datos pueden comunicarse a terceros cuando sea necesario para la prestación del servicio:
// </p>
// <ul>
//   <li>Plataforma de comercio electrónico (Shopify) para la gestión de productos, pedidos y clientes.</li>
//   <li>Proveedores de servicios de pago (pasarelas bancarias, Stripe, etc.).</li>
//   <li>Proveedores de servicios técnicos (hosting, analítica, envío de correos transaccionales o newsletters).</li>
//   <li>Administración pública y organismos oficiales, cuando sea necesario para el cumplimiento de obligaciones legales.</li>
// </ul>

// <h2>6. Plazo de conservación</h2>
// <p>
//   Los datos personales se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recabados y, posteriormente, durante los plazos
//   legalmente exigidos (por ejemplo, en materia fiscal o de responsabilidad civil).
// </p>

// <h2>7. Derechos de las personas interesadas</h2>
// <p>
//   Las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos, en los
//   términos previstos por la normativa vigente.
// </p>
// <p>
//   Para ejercer estos derechos, será necesario dirigir una solicitud al correo electrónico o dirección postal que el Responsable indicará cuando el servicio se encuentre en producción.
// </p>

// <h2>8. Cookies</h2>
// <p>
//   Este sitio web puede utilizar cookies técnicas imprescindibles para su funcionamiento y, si la persona usuaria lo acepta, cookies analíticas o de marketing.
//   Para más información, consulta la <a href="/cookies">Política de cookies</a>.
// </p>

// <h2>9. Cambios en la política de privacidad</h2>
// <p>
//   El Responsable se reserva el derecho a actualizar esta política para adaptarla a cambios legislativos o a la naturaleza del servicio. En caso de cambios relevantes,
//   se informará de forma clara a través del sitio web.
// </p>
//       `,
//     },
//     en: {
//       slug: 'legal-privacy-policy',
//       title: 'Privacy Policy',
//       body: `
// <p>
//   This Privacy Policy describes how personal data of users of this website and, where applicable,
//   the associated online store are collected, used and protected.
// </p>

// <h2>1. Data controller</h2>
// <p>
//   The data controller is the owner of the business (hereinafter, the “Controller”).
//   Contact details will be provided by the business owner and included in this section once the project
//   is moved to a production environment.
// </p>

// <h2>2. Types of data that may be processed</h2>
// <p>
//   Depending on how you use the website, the following categories of data may be processed:
// </p>
// <ul>
//   <li>Identification data: first name and last name.</li>
//   <li>Contact data: email address, phone number, postal address.</li>
//   <li>Browsing data: IP address, device identifiers, browser language, pages visited.</li>
//   <li>Purchase data: selected products, amounts, shipping and billing address (mainly managed through Shopify).</li>
// </ul>

// <h2>3. Purposes of processing</h2>
// <p>Data may be used for the following purposes:</p>
// <ul>
//   <li>To manage orders and payments made in the online store.</li>
//   <li>To respond to enquiries sent via contact forms.</li>
//   <li>To send service-related communications (for example, order confirmations).</li>
//   <li>To send commercial communications or newsletters, where consent has been obtained.</li>
//   <li>To analyse, in an aggregated way, the use of the website in order to improve services and user experience.</li>
// </ul>

// <h2>4. Legal basis for processing</h2>
// <p>The legal basis for processing may be:</p>
// <ul>
//   <li>Performance of a sales contract or management of orders.</li>
//   <li>Compliance with legal obligations (tax, accounting, consumer protection).</li>
//   <li>Explicit consent of the user, where required (for example, newsletter subscription or use of non-essential cookies).</li>
//   <li>Legitimate interest in improving the functioning of the website and preventing fraudulent use.</li>
// </ul>

// <h2>5. Data sharing and processors</h2>
// <p>
//   Data may be shared with third parties when necessary to provide the service:
// </p>
// <ul>
//   <li>E-commerce platform (Shopify) to manage products, orders and customers.</li>
//   <li>Payment service providers (bank gateways, Stripe, etc.).</li>
//   <li>Technical service providers (hosting, analytics, transactional email or newsletter services).</li>
//   <li>Public authorities and official bodies, where necessary to comply with legal obligations.</li>
// </ul>

// <h2>6. Retention period</h2>
// <p>
//   Personal data will be retained for as long as necessary to fulfil the purpose for which it was collected and, thereafter,
//   for the periods required by applicable law (for example, for tax or civil liability purposes).
// </p>

// <h2>7. Rights of data subjects</h2>
// <p>
//   Users may exercise their rights of access, rectification, erasure, objection, restriction of processing and data portability,
//   under the terms provided for by the applicable regulations.
// </p>
// <p>
//   To exercise these rights, users must submit a request to the email address or postal address that the Controller will indicate
//   once the service is in production.
// </p>

// <h2>8. Cookies</h2>
// <p>
//   This website may use technical cookies that are essential for its operation and, where the user has given consent,
//   analytical or marketing cookies. For more information, please refer to the <a href="/cookies">Cookies Policy</a>.
// </p>

// <h2>9. Changes to this Privacy Policy</h2>
// <p>
//   The Controller reserves the right to update this policy to adapt it to legal changes or to the nature of the service.
//   In the event of relevant changes, users will be clearly informed via the website.
// </p>
//       `,
//     },
//   },

//   'legal-terms': {
//     ca: {
//       slug: 'legal-terms',
//       title: 'Avís legal i termes d’ús',
//       body: `
// <p>
//   Aquest Avís legal regula l’accés i l’ús del present lloc web, així com la relació entre el Responsable i les persones que en fan ús.
// </p>

// <h2>1. Titular del lloc web</h2>
// <p>
//   El titular del lloc web és el Responsable del negoci. Les dades d’identificació i contacte s’afegiran en aquesta secció quan
//   el projecte es trobi en entorn de producció i el domini definitiu estigui actiu.
// </p>

// <h2>2. Acceptació de les condicions d’ús</h2>
// <p>
//   L’accés i navegació pel lloc web impliquen l’acceptació plena i sense reserves de les presents condicions d’ús.
//   Si no estàs d’acord amb alguna de les condicions, t’agraïm que t’abstinguis de fer ús del web.
// </p>

// <h2>3. Ús correcte del lloc web</h2>
// <p>
//   La persona usuària es compromet a utilitzar el lloc web de forma diligent, correcta i lícita, i en particular es compromet a:
// </p>
// <ul>
//   <li>No emprar el web per dur a terme activitats contràries a la llei, a la moral, a l’ordre públic o a aquestes condicions.</li>
//   <li>No difondre continguts o informació de caràcter difamatori, injuriós, xenòfob, discriminatori o que vulneri drets de tercers.</li>
//   <li>No introduir ni difondre programari maliciós (virus, malware, etc.) que pugui provocar danys en sistemes físics o lògics del Responsable o de tercers.</li>
// </ul>

// <h2>4. Continguts i propietat intel·lectual</h2>
// <p>
//   Els continguts d’aquest lloc web (textos, imatges, dissenys, logotips, etc.) poden estar protegits per drets de propietat intel·lectual
//   i/o industrial. Queda prohibida la reproducció, distribució o comunicació pública no autoritzada dels mateixos.
// </p>

// <h2>5. Enllaços a tercers</h2>
// <p>
//   El lloc web pot contenir enllaços a pàgines de tercers que són gestionades per persones o entitats alienes al Responsable.
//   El Responsable no es fa responsable dels continguts ni de les condicions d’ús o polítiques de privacitat d’aquests llocs.
// </p>

// <h2>6. Responsabilitat</h2>
// <p>
//   Tot i que es prendran les mesures raonables per mantenir aquest lloc web actualitzat i en bon funcionament, el Responsable no pot garantir:
// </p>
// <ul>
//   <li>La inexistència d’interrupcions o errors en l’accés al web.</li>
//   <li>L’absència de virus o altres elements que puguin causar danys als sistemes informàtics o als fitxers de la persona usuària.</li>
//   <li>L’exactitud o actualització permanent dels continguts, especialment quan dependran de proveïdors externs com ara plataformes de comerç electrònic.</li>
// </ul>
// <p>
//   L’ús del lloc web es realitza sota la responsabilitat exclusiva de la persona usuària.
// </p>

// <h2>7. Condicions específiques per a la botiga en línia</h2>
// <p>
//   En cas d’incloure una botiga en línia, les condicions de venda (preus, formes de pagament, enviaments, devolucions, etc.) seran les indicades
//   en el procés de compra i en les pàgines informatives corresponents. En cas de discrepància entre aquestes condicions generals i les condicions de compra,
//   prevaldran aquestes últimes.
// </p>

// <h2>8. Legislació aplicable i jurisdicció</h2>
// <p>
//   Aquest Avís legal es regeix per la legislació vigent en el país on el titular del negoci desenvolupi la seva activitat principal,
//   sense perjudici de l’aplicació d’altres normatives que puguin resultar d’aplicació obligatòria.
// </p>
// <p>
//   Per a qualsevol conflicte que pugui derivar-se de l’ús del lloc web, i sempre que la normativa aplicable no estableixi el contrari, les parts
//   se sotmetran als jutjats i tribunals competents del domicili del titular del negoci.
// </p>
//       `,
//     },
//     es: {
//       slug: 'legal-terms',
//       title: 'Aviso legal y términos de uso',
//       body: `
// <p>
//   Este Aviso legal regula el acceso y uso del presente sitio web, así como la relación entre el Responsable y las personas que lo utilizan.
// </p>

// <h2>1. Titular del sitio web</h2>
// <p>
//   El titular del sitio web es el Responsable del negocio. Los datos de identificación y contacto se añadirán en esta sección cuando el proyecto
//   se encuentre en entorno de producción y el dominio definitivo esté activo.
// </p>

// <h2>2. Aceptación de las condiciones de uso</h2>
// <p>
//   El acceso y la navegación por el sitio web implican la aceptación plena y sin reservas de las presentes condiciones de uso.
//   Si no estás de acuerdo con alguna de las condiciones, te rogamos que te abstengas de utilizar el sitio web.
// </p>

// <h2>3. Uso correcto del sitio web</h2>
// <p>
//   La persona usuaria se compromete a utilizar el sitio web de forma diligente, correcta y lícita, y en particular se compromete a:
// </p>
// <ul>
//   <li>No emplear el sitio web para realizar actividades contrarias a la ley, la moral, el orden público o las presentes condiciones.</li>
//   <li>No difundir contenidos o información de carácter difamatorio, injurioso, xenófobo, discriminatorio o que vulnere derechos de terceros.</li>
//   <li>No introducir ni difundir software malicioso (virus, malware, etc.) que pueda causar daños en los sistemas físicos o lógicos del Responsable o de terceros.</li>
// </ul>

// <h2>4. Contenidos y propiedad intelectual</h2>
// <p>
//   Los contenidos de este sitio web (textos, imágenes, diseños, logotipos, etc.) pueden estar protegidos por derechos de propiedad intelectual
//   y/o industrial. Queda prohibida la reproducción, distribución o comunicación pública no autorizada de los mismos.
// </p>

// <h2>5. Enlaces a terceros</h2>
// <p>
//   El sitio web puede contener enlaces a páginas de terceros que son gestionadas por personas o entidades ajenas al Responsable.
//   El Responsable no se hace responsable de los contenidos ni de las condiciones de uso o políticas de privacidad de dichos sitios.
// </p>

// <h2>6. Responsabilidad</h2>
// <p>
//   Aunque se adoptarán medidas razonables para mantener este sitio web actualizado y en correcto funcionamiento, el Responsable no puede garantizar:
// </p>
// <ul>
//   <li>La inexistencia de interrupciones o errores en el acceso al sitio web.</li>
//   <li>La ausencia de virus u otros elementos que puedan causar daños en los sistemas informáticos o en los ficheros de la persona usuaria.</li>
//   <li>La exactitud o actualización permanente de los contenidos, especialmente cuando dependan de proveedores externos como plataformas de comercio electrónico.</li>
// </ul>
// <p>
//   El uso del sitio web se realiza bajo la exclusiva responsabilidad de la persona usuaria.
// </p>

// <h2>7. Condiciones específicas para la tienda online</h2>
// <p>
//   En caso de incluir una tienda online, las condiciones de venta (precios, formas de pago, envíos, devoluciones, etc.) serán las indicadas
//   en el proceso de compra y en las páginas informativas correspondientes. En caso de discrepancia entre estas condiciones generales y las condiciones de compra,
//   prevalecerán estas últimas.
// </p>

// <h2>8. Legislación aplicable y jurisdicción</h2>
// <p>
//   Este Aviso legal se rige por la legislación vigente en el país en el que el titular del negocio desarrolle su actividad principal,
//   sin perjuicio de la aplicación de otras normativas que puedan resultar de aplicación obligatoria.
// </p>
// <p>
//   Para cualquier conflicto que pueda derivarse del uso del sitio web, y siempre que la normativa aplicable no establezca lo contrario, las partes
//   se someterán a los juzgados y tribunales competentes del domicilio del titular del negocio.
// </p>
//       `,
//     },
//     en: {
//       slug: 'legal-terms',
//       title: 'Legal Notice and Terms of Use',
//       body: `
// <p>
//   This Legal Notice governs access to and use of this website, as well as the relationship between the Controller and users of the site.
// </p>

// <h2>1. Website owner</h2>
// <p>
//   The owner of the website is the business Controller. Identification and contact details will be added in this section once the project is in
//   production and the final domain is active.
// </p>

// <h2>2. Acceptance of the terms of use</h2>
// <p>
//   Access to and browsing on the website imply full and unconditional acceptance of these terms of use.
//   If you do not agree with any of these terms, please refrain from using the website.
// </p>

// <h2>3. Proper use of the website</h2>
// <p>
//   Users agree to use the website diligently, correctly and lawfully, and in particular agree not to:
// </p>
// <ul>
//   <li>Use the website to carry out activities that are unlawful, immoral, contrary to public order or to these terms.</li>
//   <li>Disseminate content or information that is defamatory, offensive, xenophobic, discriminatory or that infringes the rights of third parties.</li>
//   <li>Introduce or spread malicious software (viruses, malware, etc.) that may damage the physical or logical systems of the Controller or third parties.</li>
// </ul>

// <h2>4. Content and intellectual property</h2>
// <p>
//   The contents of this website (texts, images, designs, logos, etc.) may be protected by intellectual and/or industrial property rights.
//   Any unauthorised reproduction, distribution or public communication is prohibited.
// </p>

// <h2>5. Third-party links</h2>
// <p>
//   The website may contain links to third-party pages managed by individuals or entities that are unrelated to the Controller.
//   The Controller is not responsible for the content or the terms of use or privacy policies of such sites.
// </p>

// <h2>6. Liability</h2>
// <p>
//   Although reasonable measures will be taken to keep this website up to date and functioning correctly, the Controller cannot guarantee:
// </p>
// <ul>
//   <li>The absence of interruptions or errors in access to the website.</li>
//   <li>The absence of viruses or other elements that may cause damage to users’ computer systems or files.</li>
//   <li>The accuracy or continuous updating of the content, especially when it depends on external providers such as e-commerce platforms.</li>
// </ul>
// <p>
//   Use of the website is at the sole responsibility of the user.
// </p>

// <h2>7. Specific conditions for the online store</h2>
// <p>
//   If an online store is available, the sales conditions (prices, payment methods, shipping, returns, etc.) will be those indicated in the
//   purchase process and on the relevant information pages. In case of conflict between these general terms and the specific sales conditions,
//   the latter shall prevail.
// </p>

// <h2>8. Applicable law and jurisdiction</h2>
// <p>
//   This Legal Notice is governed by the legislation in force in the country in which the business owner carries out their main activity,
//   without prejudice to the application of any other regulations that may be mandatory.
// </p>
// <p>
//   For any dispute arising from the use of the website, and provided that the applicable regulations do not state otherwise, the parties
//   shall submit to the competent courts of the business owner’s domicile.
// </p>
//       `,
//     },
//   },

//   'legal-cookies-policy': {
//     ca: {
//       slug: 'legal-cookies-policy',
//       title: 'Política de cookies',
//       body: `
// <p>
//   Aquesta Política de cookies explica què són les cookies, quins tipus s’utilitzen en aquest lloc web i com pots gestionar les teves preferències.
// </p>

// <h2>1. Què són les cookies?</h2>
// <p>
//   Les cookies són petits fitxers de text que es descarreguen al dispositiu de la persona usuària quan accedeix a determinades pàgines web.
//   Permeten, entre altres coses, emmagatzemar i recuperar informació sobre els hàbits de navegació, i en funció de la informació que continguin
//   i de la forma en què s’utilitzi el dispositiu, poden utilitzar-se per reconèixer l’usuari.
// </p>

// <h2>2. Tipus de cookies utilitzades</h2>
// <p>
//   Aquest lloc web pot utilitzar les següents categories de cookies:
// </p>
// <ul>
//   <li>
//     <strong>Cookies tècniques o necessàries:</strong>
//     indispensables per al funcionament del web i per permetre funcions bàsiques com, per exemple, iniciar sessió o recordar el contingut del cistell de la compra.
//   </li>
//   <li>
//     <strong>Cookies de preferències o personalització (si s’escau):</strong>
//     permeten recordar informació perquè la persona usuària accedeixi al servei amb determinades característiques, com ara l’idioma preferit.
//   </li>
//   <li>
//     <strong>Cookies analítiques (subjectes a consentiment):</strong>
//     permeten quantificar el nombre de persones usuàries i analitzar l’ús que es fa del web amb finalitats estadístiques.
//   </li>
//   <li>
//     <strong>Cookies de publicitat o de seguiment (subjectes a consentiment):</strong>
//     s’utilitzen per mostrar publicitat personalitzada en funció del perfil de navegació.
//   </li>
// </ul>

// <h2>3. Gestió del consentiment</h2>
// <p>
//   En la primera visita al lloc web, es pot mostrar un banner o avís de cookies que permeti acceptar o rebutjar l’ús de cookies no essencials
//   (analítiques o de seguiment).
// </p>
// <p>
//   Pots modificar les teves preferències en qualsevol moment, mitjançant:
// </p>
// <ul>
//   <li>Les opcions de configuració del banner de cookies (si està disponible).</li>
//   <li>La configuració del navegador, que permet bloquejar o eliminar cookies.</li>
// </ul>

// <h2>4. Com eliminar o bloquejar cookies</h2>
// <p>
//   Pots configurar el teu navegador per bloquejar o eliminar cookies. Les instruccions específiques poden variar segons el navegador:
// </p>
// <ul>
//   <li><strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong>, <strong>Edge</strong>, etc. disposen d’opcions de configuració de privacitat i seguretat.</li>
// </ul>
// <p>
//   Tingues en compte que la desactivació de determinades cookies tècniques pot afectar el funcionament correcte del lloc web.
// </p>

// <h2>5. Cookies de tercers</h2>
// <p>
//   En alguns casos, es poden utilitzar serveis de tercers que instal·lin cookies des dels seus propis dominis (per exemple, eines d’analítica o integracions amb xarxes socials).
//   Aquests tercers són responsables de les seves pròpies polítiques de cookies i privacitat.
// </p>

// <h2>6. Actualitzacions d’aquesta política</h2>
// <p>
//   Aquesta Política de cookies pot ser actualitzada per reflectir canvis en l’ús de cookies al lloc web o en la normativa aplicable.
//   Es recomana revisar-la periòdicament.
// </p>
//       `,
//     },
//     es: {
//       slug: 'legal-cookies-policy',
//       title: 'Política de cookies',
//       body: `
// <p>
//   Esta Política de cookies explica qué son las cookies, qué tipos se utilizan en este sitio web y cómo puedes gestionar tus preferencias.
// </p>

// <h2>1. ¿Qué son las cookies?</h2>
// <p>
//   Las cookies son pequeños archivos de texto que se descargan en el dispositivo de la persona usuaria cuando accede a determinadas páginas web.
//   Permiten, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación y, en función de la información que contengan
//   y de la forma en que se utilice el dispositivo, pueden utilizarse para reconocer al usuario.
// </p>

// <h2>2. Tipos de cookies utilizadas</h2>
// <p>
//   Este sitio web puede utilizar las siguientes categorías de cookies:
// </p>
// <ul>
//   <li>
//     <strong>Cookies técnicas o necesarias:</strong>
//     imprescindibles para el funcionamiento del sitio web y para permitir funciones básicas como, por ejemplo, iniciar sesión o recordar el contenido del carrito de la compra.
//   </li>
//   <li>
//     <strong>Cookies de preferencias o personalización (en su caso):</strong>
//     permiten recordar información para que la persona usuaria acceda al servicio con determinadas características, como el idioma preferido.
//   </li>
//   <li>
//     <strong>Cookies analíticas (sujetas a consentimiento):</strong>
//     permiten cuantificar el número de personas usuarias y analizar el uso que se hace del sitio web con fines estadísticos.
//   </li>
//   <li>
//     <strong>Cookies de publicidad o seguimiento (sujetas a consentimiento):</strong>
//     se utilizan para mostrar publicidad personalizada en función del perfil de navegación.
//   </li>
// </ul>

// <h2>3. Gestión del consentimiento</h2>
// <p>
//   En la primera visita al sitio web, puede mostrarse un banner o aviso de cookies que permita aceptar o rechazar el uso de cookies no esenciales
//   (analíticas o de seguimiento).
// </p>
// <p>
//   Puedes modificar tus preferencias en cualquier momento mediante:
// </p>
// <ul>
//   <li>Las opciones de configuración del banner de cookies (si está disponible).</li>
//   <li>La configuración del navegador, que permite bloquear o eliminar cookies.</li>
// </ul>

// <h2>4. Cómo eliminar o bloquear cookies</h2>
// <p>
//   Puedes configurar tu navegador para bloquear o eliminar cookies. Las instrucciones específicas pueden variar según el navegador:
// </p>
// <ul>
//   <li><strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong>, <strong>Edge</strong>, etc. disponen de opciones de configuración de privacidad y seguridad.</li>
// </ul>
// <p>
//   Ten en cuenta que la desactivación de determinadas cookies técnicas puede afectar al correcto funcionamiento del sitio web.
// </p>

// <h2>5. Cookies de terceros</h2>
// <p>
//   En algunos casos, pueden utilizarse servicios de terceros que instalen cookies desde sus propios dominios (por ejemplo, herramientas de analítica o integraciones con redes sociales).
//   Estos terceros son responsables de sus propias políticas de cookies y privacidad.
// </p>

// <h2>6. Actualizaciones de esta política</h2>
// <p>
//   Esta Política de cookies puede actualizarse para reflejar cambios en el uso de cookies en el sitio web o en la normativa aplicable.
//   Se recomienda revisarla periódicamente.
// </p>
//       `,
//     },
//     en: {
//       slug: 'legal-cookies-policy',
//       title: 'Cookies Policy',
//       body: `
// <p>
//   This Cookies Policy explains what cookies are, which types are used on this website and how you can manage your preferences.
// </p>

// <h2>1. What are cookies?</h2>
// <p>
//   Cookies are small text files that are downloaded to the user’s device when they access certain web pages.
//   They allow, among other things, information to be stored and retrieved about browsing habits and, depending on the information
//   they contain and how the device is used, they may be used to recognise the user.
// </p>

// <h2>2. Types of cookies used</h2>
// <p>
//   This website may use the following categories of cookies:
// </p>
// <ul>
//   <li>
//     <strong>Technical or necessary cookies:</strong>
//     essential for the functioning of the website and for enabling basic functions, such as logging in or remembering the contents of the shopping cart.
//   </li>
//   <li>
//     <strong>Preference or personalisation cookies (where applicable):</strong>
//     allow information to be remembered so that the user accesses the service with certain characteristics, such as preferred language.
//   </li>
//   <li>
//     <strong>Analytical cookies (subject to consent):</strong>
//     allow the number of users to be quantified and the use of the website to be analysed for statistical purposes.
//   </li>
//   <li>
//     <strong>Advertising or tracking cookies (subject to consent):</strong>
//     are used to display personalised advertising based on the user’s browsing profile.
//   </li>
// </ul>

// <h2>3. Managing consent</h2>
// <p>
//   On the first visit to the website, a cookie banner or notice may be displayed, allowing the user to accept or reject the use of non-essential
//   cookies (analytical or tracking).
// </p>
// <p>
//   You can change your preferences at any time via:
// </p>
// <ul>
//   <li>The settings options of the cookie banner (if available).</li>
//   <li>Your browser settings, which allow you to block or delete cookies.</li>
// </ul>

// <h2>4. How to delete or block cookies</h2>
// <p>
//   You can configure your browser to block or delete cookies. Specific instructions may vary depending on the browser:
// </p>
// <ul>
//   <li><strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong>, <strong>Edge</strong>, etc. all provide privacy and security settings.</li>
// </ul>
// <p>
//   Please note that disabling certain technical cookies may affect the proper functioning of the website.
// </p>

// <h2>5. Third-party cookies</h2>
// <p>
//   In some cases, third-party services may be used that install cookies from their own domains (for example, analytics tools or social network integrations).
//   These third parties are responsible for their own cookies and privacy policies.
// </p>

// <h2>6. Updates to this policy</h2>
// <p>
//   This Cookies Policy may be updated to reflect changes in the use of cookies on the website or changes in applicable law.
//   You are advised to review it periodically.
// </p>
//       `,
//     },
//   },
// }

/**
 * Helper legacy per compatibilitat.
 * Si en algun punt antic del codi es fa servir getContentBySlug,
 * seguirà funcionant. El CMS nou (cms/blocks.ts, cms/pages.ts)
 * ja no ho necessita directament.
 */
export async function getContentBySlug(
  slug: string,
  locale: Locale,
): Promise<CmsBlock | null> {
  // Simulem una mica de latència de CMS (com feies abans)
  await new Promise(resolve => setTimeout(resolve, 200))

  // 1) Primer mirem als mocks legals
  // const legalBySlug = LEGAL_MOCK_CONTENT[slug]
  const legalBySlug = CONTENTFUL_LEGAL_STORE[slug]
  if (legalBySlug) {
    const legalLocalized =
      legalBySlug[locale] ?? legalBySlug.ca ?? null

    if (legalLocalized) {
      return {
        slug,
        title: legalLocalized.title,
        collection: 'content',  // legal NO és una col·lecció pròpia
        category: 'legal',
        tags: ['legal'],
        locale,
        raw: null,
        ast: null,
        render: legalLocalized.body ?? null,
      }
    }
  }

  // 2) Després, mirem als mocks generals
  // const blockBySlug = MOCK_CONTENT[slug]
  const blockBySlug = CONTENTFUL_CONTENT_STORE[slug]
  if (blockBySlug) {
    const localized =
      blockBySlug[locale] ?? blockBySlug.ca ?? null

    if (localized) {
      return {
        slug,
        title: localized.title,
        collection: 'content',
        category: null,
        tags: null,
        locale,
        raw: null,
        ast: null,
        render: localized.body,
      }
    }
  }

  // Si no trobem res:
  return null
}

/**
 * Stub de l’API de llistes CMS per al backend Contentful.
 *
 * De moment:
 *  - només fa log
 *  - retorna una llista buida
 *
 * Futur:
 *  - reemplaçar per una query real a Contentful (REST/GraphQL)
 */
export async function contentfulListEntries(
  params: CmsListQuery,
): Promise<CmsListItem[]> {
  console.warn('[cms/contentful] contentfulListEntries() not implemented yet', params)
  return []
}
