import java.util.Scanner;


public class ReverseHashing {

	static String letters = "acdegilmnoprstuw";
	static int maxStrLength = letters.length();
	
	public static void main(String[] args) {
		Scanner inputScanner = new Scanner(System.in);
		System.out.println("Enter the hash value:");
		long hash = inputScanner.nextLong();
		System.out.println(reverseHash(hash,new StringBuffer(),maxStrLength));
		
	}
	
	public static StringBuffer reverseHash(long finalHash, StringBuffer hashedString, int strLength){		
		if(finalHash==7)
			return hashedString.reverse();
		else if(strLength == 0){
				return new StringBuffer("Sorry! There is no string for the given hash!");	
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