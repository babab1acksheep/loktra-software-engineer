
public class ReverseHashing {

	public static void main(String[] args) {
		System.out.println(reverseHash(930846109532517L,new StringBuffer(),9));
	}
	
	public static StringBuffer reverseHash(long finalHash, StringBuffer hashedString, int strLength){	
		String letters = "acdegilmnoprstuw";
		if(strLength==0){
			return hashedString.reverse();
		}
		else{
			for(int i = 0 ; i<letters.length() ; i++){
				if((finalHash-i)%37==0){
					hashedString.append(letters.charAt(i));					
					finalHash = (finalHash-i)/37;
					break;
				}
			}
			return reverseHash(finalHash, hashedString, --strLength);
		}				
	}
}