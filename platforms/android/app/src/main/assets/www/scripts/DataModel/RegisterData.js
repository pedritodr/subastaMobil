
class RegisterData {
    constructor(has_huella,token_huella,name,email,phone,password,repeat_password,platform_id,imei){
        this.has_huella = has_huella;
        this.token_huella = token_huella;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.repeat_password = repeat_password;
        this.platform_id = platform_id;
        this.imei - imei;
    }


    get get_has_huella(){
        return this.has_huella;
    }

    get get_token_huella(){
        return this.token_huella;
    }

    get get_name(){
        return this.name;
    }

    get get_email(){
        return this.email;
    }

    get get_phone(){
        return this.phone;
    }

    get get_password(){
        return this.password;
    }

    get get_repeat_password(){
        return this.repeat_password;
    }

    get get_platform_id(){
        return this.platform_id;
    }

    get get_imei(){
        return this.imei;
    }











}



