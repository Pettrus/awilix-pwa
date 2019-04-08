import { toast } from 'react-toastify';

export const mensagemToast = (mensagem, tipo) => {
    if(tipo == null || tipo === "sucesso")
        toast.success(mensagem);
    else if(tipo === "warn")
        toast.warn(mensagem);
    else
        toast.error(mensagem);
}

export const checarErro = (erro) => {
    console.log(erro);
    if(erro.data.status === 418)
        mensagemToast(erro.data.message, "warn");
    else if(erro.data.errors != null && erro.data.errors.length > 0)
        mensagemToast(erro.data.errors[0].defaultMessage, "warn");
    else
        mensagemToast("Ocorreu um erro, tente novamente mais tarde.", "error");
}