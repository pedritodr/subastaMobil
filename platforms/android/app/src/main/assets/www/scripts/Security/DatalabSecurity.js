//Author: Rafael Bomate
//Empresa: DataLab Center
document.write('<script type="text/javascript" src="scripts/Security/node_modules/crypto-js/crypto-js.js"></script>');
document.write('<script type="text/javascript" src="scripts/Security/jsencrypt.min.js"></script>');

class DatalabSecurity {
    constructor(){
        this.private_key = '-----BEGIN RSA PRIVATE KEY-----'+
            'MIIEpAIBAAKCAQEA74bHo+pTi/iX/75hbu1QJ+XYReWOlTBw/3hT72a7S9Oo1NbG'+
            'bdH95bDyA3CrsumpTR6KIflXMOISUvWhIF8UVSZt05SsMfMRnCDgjzFBwtHrdtnO'+
            'F5OvId5myVQirgFrWd28uh6xyd9cTshp1hxuuDogN7/mu8O9grcbou1PUPJ3Q5u5'+
            '9viYTbwcGAuSfkgPuGdmSO3lcNtb/m1/0fuH0ZaX2X2Tw2X8xMmpsPYi5o/zPKSk'+
            '3ueGP4ppa1KWBRjHu+Uf0WnkHa3SDh1yuPYck0CR7S16kjfFIkPGPuMii58YpU5G'+
            'BE+k9Iw5GiPykBwrihS4X89HPawUcsB4bCQHJQIDAQABAoIBAQCoB94PgHghrkA7'+
            'ObwyTCq6AoTI6/QtdrEelrQTMvdbh11eClljezfpJUtx3F2nAkIxhqYSlU90THPc'+
            'XNIu2mRyI6ZSEm8GD2WgKHRAH6bpW8gaNUtdwM3QLavfurUlant7rJET5CqG2rlv'+
            'zypn+MQ3Wxd05JuhxvwwMfIiRuYoesRYTrhif82ubYRaIcM+4OJNPSnGlrLLkWR/'+
            'hA+WjalcrDDSI2rVv2noPZXMzFK9lZ0gXar9UWs61Iy03ZxLPwYSi68B3PSOKP6C'+
            '1fIB+6R9AoMNNz7/TkdKs7vGd7hZBs8WWs1s6YuX9nwVg4PsC+73wZ2xDo56+QNs'+
            'I+bd01d1AoGBAP8W3S2SuCR4wzlQsKjRb8RcVoxXLDm4Tv4k/VhcMc0+GUKF5lq/'+
            'Gik7tFRxbb4xhw9+6CyI4FwO7H4S28bYvx1QpCsykVkYNz0yIwG2cYumKBq/OnBj'+
            '93AsSsbymgC3y+Ns4coxjyfHygW2X61SCAj6JEISmRQ4GNH1SnP/55ZzAoGBAPBh'+
            'sUDOmqsLm1F9DrK5Y7HA3XqIrPGSscBc/YUnTV493RZv2/8KEEJYb7jZzN/MnUBi'+
            'vbn8V/T75HRwYMCoWnAa6p3qEUaK3TeZBIJ7vvrdKjHKIDVK4bUXUhprdw9ewHhZ'+
            'qUX/IvR4vKHaP///jbv2qiH47e0TfM5uKcm5UO4HAoGBAPxZYQrRh2tFMFQF+A25'+
            'yuilNFV3c1/SbgrLCvmbkwTodtKxZfXF8Zpy3u1enOM3WdZBhGtyKQnJFbmO7G5l'+
            'Q4M7oHy/dLx/0T2v2KO8Gc293RTAso42xrTojD0OCL3HFWNx9lgw+N6wrbFC/pmW'+
            'ei5vTukyPs+awysJjtL8iNzzAoGAJBeG9aQPtP7ZIzMTseIEBfxfRLagwOS1q5xK'+
            'tGNiSnQfbe79qR1ps4xzud151WBze+dXdUVeL3piotj8rfCZI5vm/i7WyTCwZlij'+
            'RLQvyJrMaw1eKKJFoVsPCMh55+TiIS/VKp1UMkCukd6jHVzRexdeFBu8HYx/gL8p'+
            'pxAcBqECgYAiJPJ8BimXAbBUsnpQgiPt4bSoYOcIysvZ9bK4iQTIiwUzd3/D9MWh'+
            'mO2pyvvgXFHX7/Mk6bA5UI1ee+hXjsuWQna70jOUure2sJVtA0D41+Iel93iXcNe'+
            'G6VE05PfvHKg4NjXvLyiolYGjAdiAaYHvw2IoIZB8OQZNZbpzPXwCA=='+
            '-----END RSA PRIVATE KEY-----';
        this.public_key = '-----BEGIN PUBLIC KEY-----'+
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA74bHo+pTi/iX/75hbu1Q'+
            'J+XYReWOlTBw/3hT72a7S9Oo1NbGbdH95bDyA3CrsumpTR6KIflXMOISUvWhIF8U'+
            'VSZt05SsMfMRnCDgjzFBwtHrdtnOF5OvId5myVQirgFrWd28uh6xyd9cTshp1hxu'+
            'uDogN7/mu8O9grcbou1PUPJ3Q5u59viYTbwcGAuSfkgPuGdmSO3lcNtb/m1/0fuH'+
            '0ZaX2X2Tw2X8xMmpsPYi5o/zPKSk3ueGP4ppa1KWBRjHu+Uf0WnkHa3SDh1yuPYc'+
            'k0CR7S16kjfFIkPGPuMii58YpU5GBE+k9Iw5GiPykBwrihS4X89HPawUcsB4bCQH'+
            'JQIDAQAB'+
            '-----END PUBLIC KEY-----';
    }

    procesar_datos_envio(json_data_envio){
		
		var max_length = 64; //bloques de 64 bytes   

        var offset = 0;
        var output = new Array();
		
		 while(offset < json_data_envio.length){
			var subcadena = json_data_envio.substr(offset,max_length);
            offset +=max_length;
			
			//procesar cifrado por bloques
			var llave_cifrado = this.generate_random_key_128;
			var estructura_cifrado = JSON.parse(this.cifrar_aes(llave_cifrado,subcadena));
			var estructura_decifrado = {salt:estructura_cifrado.salt,iv:estructura_cifrado.iv,key:llave_cifrado};
			var cadena_aes = estructura_cifrado.ciphertext+'<-->'+JSON.stringify(estructura_decifrado);
			var texto_encriptado_rsa = this.encrypt_rsa(cadena_aes,this.public_key);
			output.push(texto_encriptado_rsa);
		 }
		 
		 return output;
    }

    procesar_datos_respuesta(response_cifrado){ // el parametro es un arreglo con los bloques de cifrado

		var output = '';
		for(var i=0;i<response_cifrado.length;i++){
			var desencriptado_rsa = this.decrypt_rsa(response_cifrado[i],this.private_key);			
			var separated_desencriptado_rsa = desencriptado_rsa.split("<-->");
			
			var encriptado_aes = separated_desencriptado_rsa[0];
			
			var estructura_desencriptado = JSON.parse(separated_desencriptado_rsa[1]);

			var cadena_texto_plano_respuesta = this.descifrar_aes(encriptado_aes,estructura_desencriptado);			
			output+=cadena_texto_plano_respuesta;
		}
		
		return JSON.parse(output);
    }

    get generate_random_key_128(){
        var longitud_cadena = 16; //16 bytes = 128 bits
        var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var cadena = "";
        for(var i=0;i<longitud_cadena;i++){
            var index = Math.floor((Math.random() * alfabeto.length));
            cadena+=alfabeto.charAt(index);
        }
        return cadena;
    }

    cifrar_aes(passphrase, plain_text){
        var salt = CryptoJS.lib.WordArray.random(4);
        var iv = CryptoJS.lib.WordArray.random(16);
        //for more random entropy can use : https://github.com/wwwtyro/cryptico/blob/master/random.js instead CryptoJS random() or another js PRNG

        var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999 });

        var encrypted = CryptoJS.AES.encrypt(plain_text, key, {iv: iv});

        var data = {
            ciphertext : CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
            salt : CryptoJS.enc.Hex.stringify(salt),
            iv : CryptoJS.enc.Hex.stringify(iv)

        }

        return JSON.stringify(data);
    }

    descifrar_aes(texto_encriptado,obj_json){

        var encrypted = texto_encriptado;
        var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
        var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

        var key = CryptoJS.PBKDF2(obj_json.key, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});


        var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});
		
        return atob(decrypted.toString(CryptoJS.enc.Base64)); //decodifico la respuesta que la saco en base64
    }

    encrypt_rsa(mensaje,llave_publica){
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(llave_publica);
        var encrypted = encrypt.encrypt(mensaje);
        return encrypted;
    }

    decrypt_rsa(mensaje,llave_privada){
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(llave_privada);
        var uncrypted = decrypt.decrypt(mensaje);
        return uncrypted;
    }

}



