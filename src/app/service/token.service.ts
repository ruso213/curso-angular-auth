import { Injectable } from '@angular/core';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    
  ) { }

  setToken(token: string){
    setCookie('token', token)
  }
  getToken(){
    return getCookie('token')
  }
  deleteToken(){
    removeCookie('token')
  }
  isValidToken(){                                     //lo que hacemos en esta funcion es validar si el token es valido
    const token = this.getToken()                     //por su fecha de expiracion ya que cada 5hrs el token se elimina
    if(!token){                                       //1- primero obtenemos el token y verificamos que exista
      return false                                    //
    }                                                 //2- con la ayuda de la libreria de jwt-decode el token que resive
    const decode_token  = jwtDecode<JwtPayload>(token)//   es tranformado a un objeto el cual podemos entender
    if(decode_token && decode_token.exp){      //3- aqui vemos si el token contiene fecha de expiracion *decode_token.exp*
//                                             //entonces para validar si el token sigue siendo valido lo que hacemos es
      const de_TknDate = new Date(0)           //crear un Date sin fecha inicial *const de_TknDate = new Date(0)* para   
      de_TknDate.setUTCSeconds(decode_token.exp)//luego pasarle la fecha de expiracion del token y luego crear 
      const today = new Date()              //la fecha actual para poder ver si la fecha del token es mayor que la actual  
      console.log('decode_token.exp', decode_token.exp) 
      console.log('today.exp', today.getTime()) 
      
      return de_TknDate.getTime() > today.getTime() //4- aqui vemos si la fecha actual no supera a la de expiracion del Tkn
    }
    return false
  }
  setRefreshToken(token: string){
    setCookie('refresh-token', token)
  }
  getRefreshToken(){
    return getCookie('refresh-token')
  }
  deleteRefreshToken(){
    removeCookie('refresh-token')
  }
  
  isValidRefreshToken(){                              
    console.log("epne")                                            
    const token = this.getRefreshToken()                     
    if(!token){                                       
      return false                                    
    }                                                 
    const decode_token  = jwtDecode<JwtPayload>(token)
    if(decode_token && decode_token.exp){     
      const de_TknDate = new Date(0)          
      de_TknDate.setUTCSeconds(decode_token.exp)
      const today = new Date()              
      console.log('decode_token.exp', decode_token.exp) 
      console.log('today.exp', today.getTime()) 
      
      return de_TknDate.getTime() > today.getTime()
    }
    return false
  }
}
