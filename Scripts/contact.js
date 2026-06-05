// ============================================
//   CONTACT FORM — Validación y envío
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://netcorereistros.somee.com/api/Contact';

    // Campos del formulario
    const fields = {
        Nombre:  document.getElementById('contact-nombre'),
        Correo:   document.getElementById('contact-email-input'),
        Asunto:  document.getElementById('contact-asunto'),
        Mensaje: document.getElementById('contact-mensaje'),
    };

    const submitBtn = document.getElementById('contact-submit');

    // ── Helpers ──────────────────────────────

    function showError(input, message) {
        clearError(input);
        input.classList.add('input-error');

        const error = document.createElement('span');
        error.className = 'contact-form-error';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearError(input) {
        input.classList.remove('input-error');
        const prev = input.parentElement.querySelector('.contact-form-error');
        if (prev) prev.remove();
    }

    function clearAllErrors() {
        Object.values(fields).forEach(f => clearError(f));
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        submitBtn.querySelector('span').textContent = loading ? 'Enviando...' : 'Enviar mensaje';
    }

    function showToast(message, type = 'success') {
        const existing = document.querySelector('.contact-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `contact-toast contact-toast--${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animación de entrada
        requestAnimationFrame(() => toast.classList.add('contact-toast--visible'));

        // Auto-cierre después de 4s
        setTimeout(() => {
            toast.classList.remove('contact-toast--visible');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ── Validaciones frontend ─────────────────

    function validate() {
        let isValid = true;

        // Nombre — requerido, mínimo 2 caracteres
        if (!fields.nombre.value.trim()) {
            showError(fields.nombre, 'El nombre es requerido.');
            isValid = false;
        } else if (fields.nombre.value.trim().length < 2) {
            showError(fields.nombre, 'El nombre debe tener al menos 2 caracteres.');
            isValid = false;
        } else {
            clearError(fields.nombre);
        }

        // Email — requerido, formato básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.email.value.trim()) {
            showError(fields.email, 'El correo es requerido.');
            isValid = false;
        } else if (!emailRegex.test(fields.email.value.trim())) {
            showError(fields.email, 'Ingresa un correo válido.');
            isValid = false;
        } else {
            clearError(fields.email);
        }

        // Asunto — requerido
        if (!fields.asunto.value) {
            showError(fields.asunto, 'Selecciona un asunto.');
            isValid = false;
        } else {
            clearError(fields.asunto);
        }

        // Mensaje — requerido, mínimo 10 caracteres
        if (!fields.mensaje.value.trim()) {
            showError(fields.mensaje, 'El mensaje es requerido.');
            isValid = false;
        } else if (fields.mensaje.value.trim().length < 10) {
            showError(fields.mensaje, 'El mensaje debe tener al menos 10 caracteres.');
            isValid = false;
        } else {
            clearError(fields.mensaje);
        }

        return isValid;
    }

    // ── Limpiar error al corregir el campo ────

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => clearError(field));
        field.addEventListener('change', () => clearError(field));
    });

    // ── Envío ─────────────────────────────────

    submitBtn.addEventListener('click', async () => {
        clearAllErrors();

        if (!validate()) return;

        setLoading(true);

        const body = {
            Nombre:  fields.nombre.value.trim(),
            Correo:   fields.email.value.trim(),
            Asunto:  fields.asunto.value,
            Mensaje: fields.mensaje.value.trim(),
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                // Éxito
                showToast('¡Mensaje enviado! Te responderé pronto.', 'success');
                Object.values(fields).forEach(f => f.value = '');
                document.getElementById('contact-char-count').textContent = '0/500';
                clearAllErrors();
            } else {
                // Error de la API (validaciones del backend, etc.)
                if (data.errors) {
                    Object.entries(data.errors).forEach(([key, msg]) => {
                        if (fields[key]) showError(fields[key], msg);
                    });
                } else {
                    showToast(data.message || 'Ocurrió un error. Intenta de nuevo.', 'error');
                }
            }

        } catch (err) {
            // Error de red / API caída
            showToast('No se pudo conectar con el servidor. Intenta más tarde.', 'error');
            console.error('Contact form error:', err);
        } finally {
            setLoading(false);
        }
    });

});
