export default function productValidation(values) {

    const errors = {};
    if (!values.title) errors.title = "Por favor, complete el título"
    else if (values.title.length > 50) errors.title = "El título no puede tener más de 50 caracteres"
    else if (values.title.length < 5) errors.title = "El título debe tener al menos 5 caracteres"

    if (!values.description) errors.description = "Por favor, complete la descripción"
    else if (values.description.length < 5) errors.description = "La descripción debe tener al menos 5 caracteres";

    if (!values.code) errors.code = "Por favor, complete el código";
    if (!values.stock) errors.stock = "Por favor, complete el stock";
    if (!values.price) errors.price = "Por favor, complete el precio";
    if (!values.category) errors.category = "Por favor, complete la categoría";

    return errors;
}