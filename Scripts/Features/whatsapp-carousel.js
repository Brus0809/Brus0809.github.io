/* === WhatsApp Bot Case Study Carousel === */

const whatsappSteps = [
    {
        title: "Paso 1: Inicialización de la Conversación",
        desc: "El usuario inicia la interacción enviando un saludo inicial (por ejemplo, 'Hola' o 'Facturar') para activar el bot de WhatsApp. El bot responde automáticamente saludando y presentando las opciones disponibles.",
        bullets: [
            "Webhook activo 24/7 desarrollado en ASP.NET Core.",
            "Respuesta asíncrona inmediata mediante la API oficial de WhatsApp."
        ]
    },
    {
        title: "Paso 2: Selección de Opción del Menú",
        desc: "El bot presenta un menú interactivo en forma de lista o botones. El usuario selecciona la opción correspondiente para iniciar el proceso de facturación electrónica.",
        bullets: [
            "Uso de listas interactivas y botones nativos de WhatsApp para evitar errores de captura.",
            "Validación automática del estado del servicio de facturación."
        ]
    },
    {
        title: "Paso 3: Identificación del RFC",
        desc: "El bot solicita el RFC del contribuyente para validar su existencia en la base de datos empresarial de SQL Server y determinar si es cliente nuevo o registrado.",
        bullets: [
            "Validación de formato sintáctico del RFC en el cliente (Regex).",
            "Consulta optimizada mediante Stored Procedures en SQL Server."
        ]
    },
    {
        title: "Paso 4: Captura de Datos Fiscales",
        desc: "Si el RFC es nuevo, el bot guía al usuario para capturar su Razón Social o nombre completo, adaptándose a las disposiciones vigentes del SAT.",
        bullets: [
            "Validación en tiempo real para evitar caracteres no permitidos por el SAT.",
            "Flujo conversacional optimizado para una captura rápida y amigable."
        ]
    },
    {
        title: "Paso 5: Régimen Fiscal y Código Postal",
        desc: "Se solicita el Régimen Fiscal y el Código Postal de la dirección fiscal del contribuyente, datos indispensables para la emisión del CFDI 4.0.",
        bullets: [
            "Búsqueda dinámica y catálogo de regímenes fiscales oficiales SAT incorporados.",
            "Validación cruzada entre el tipo de persona (Física/Moral) y el Régimen Fiscal."
        ]
    },
    {
        title: "Paso 6: Validación del Ticket de Compra",
        desc: "El usuario ingresa el folio o código del ticket de compra y el monto total para que el bot corrobore los datos de la transacción en el ERP.",
        bullets: [
            "Integración en tiempo real con la base de datos del ERP / Punto de Venta (Simphony/PEP/OFIS).",
            "Validación de vigencia de la compra para evitar la facturación de tickets vencidos o duplicados."
        ]
    },
    {
        title: "Paso 7: Selección del Uso de CFDI",
        desc: "El bot presenta un listado de opciones de Uso de CFDI compatibles con el Régimen Fiscal seleccionado por el usuario.",
        bullets: [
            "Validaciones alineadas a la matriz de compatibilidad del SAT para CFDI 4.0.",
            "Lista simplificada para mejorar la comprensión del usuario final."
        ]
    },
    {
        title: "Paso 8: Confirmación de Información",
        desc: "El bot genera un resumen completo con toda la información capturada (Datos fiscales, Ticket y Uso de CFDI) y solicita al usuario confirmar que todo esté correcto.",
        bullets: [
            "Resumen visual estructurado para una fácil lectura rápida.",
            "Previene errores de timbrado que requieran cancelaciones posteriores."
        ]
    },
    {
        title: "Paso 9: Timbrado Fiscal en Tiempo Real",
        desc: "Al confirmar los datos, el bot se comunica con el motor de facturación para estructurar el XML y realizar el timbrado oficial ante el SAT a través del PAC.",
        bullets: [
            "Consumo del Web Service del PAC mediante cliente REST optimizado en .NET.",
            "Manejo robusto de reintentos y códigos de error del SAT."
        ]
    },
    {
        title: "Paso 10: Entrega de Factura (PDF y XML)",
        desc: "Una vez timbrada exitosamente, el bot envía la representación gráfica en PDF y el archivo XML directamente en el chat, finalizando el proceso en menos de 2 minutos.",
        bullets: [
            "Descarga dinámica de archivos desde almacenamiento y envío como adjuntos multimedia.",
            "Envío simultáneo por correo electrónico registrado de forma automática."
        ]
    }
];

let currentWhatsappStep = 1;

function initWhatsAppCarousel() {
    const prevBtn = document.getElementById('whatsapp-carousel-prev');
    const nextBtn = document.getElementById('whatsapp-carousel-next');
    const slides = document.querySelectorAll('.whatsapp-carousel-slide');
    const indicators = document.querySelectorAll('.whatsapp-indicator');
    
    if (!prevBtn || !nextBtn) return;
    
    // Function to update the step view
    function goToStep(stepNum) {
        if (stepNum < 1 || stepNum > 10) return;
        
        currentWhatsappStep = stepNum;
        
        // Update slides
        document.querySelectorAll('.whatsapp-carousel-slide').forEach(slide => {
            slide.classList.remove('active');
            if (parseInt(slide.getAttribute('data-step')) === stepNum) {
                slide.classList.add('active');
            }
        });
        
        // Update indicators (dots)
        document.querySelectorAll('.whatsapp-indicator').forEach(ind => {
            ind.classList.remove('active');
            if (parseInt(ind.getAttribute('data-step')) === stepNum) {
                ind.classList.add('active');
            }
        });
        
        // Update text content
        const stepData = whatsappSteps[stepNum - 1];
        document.getElementById('whatsapp-step-number').textContent = stepNum;
        document.getElementById('whatsapp-step-title').textContent = stepData.title;
        document.getElementById('whatsapp-step-desc').textContent = stepData.desc;
        
        // Update bullets
        const bulletsContainer = document.getElementById('whatsapp-step-bullets');
        bulletsContainer.innerHTML = '';
        stepData.bullets.forEach(bulletText => {
            const li = document.createElement('li');
            li.textContent = bulletText;
            bulletsContainer.appendChild(li);
        });
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        let prevStep = currentWhatsappStep - 1;
        if (prevStep < 1) prevStep = 10; // loop back
        goToStep(prevStep);
    });
    
    nextBtn.addEventListener('click', () => {
        let nextStep = currentWhatsappStep + 1;
        if (nextStep > 10) nextStep = 1; // loop back
        goToStep(nextStep);
    });
    
    // Event listeners for indicators (dots)
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const stepNum = parseInt(indicator.getAttribute('data-step'));
            goToStep(stepNum);
        });
    });
}
