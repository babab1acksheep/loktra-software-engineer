import java.util.Scanner;


public class ReverseHashing {

	public static void main(String[] args) {
		Scanner inputScanner = new Scanner(System.in);
		System.out.println("Enter the hash value:");
		long hash = inputScanner.nextLong();
		System.out.println("Enter the number of letters in the string:");
		int strLength = inputScanner.nextInt();
		System.out.println(reverseHash(hash,new StringBuffer(),strLength));
		
	}
	
	public static StringBuffer reverseHash(long finalHash, StringBuffer hashedString, int strLength){
		String letters = "acdegilmnoprstuw";
		if(strLength==0){
			if(finalHash==7)
				return hashedString.reverse();
			else
				return new StringBuffer("Sorry! There is no string for the given hash with the given number of letters!");		
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