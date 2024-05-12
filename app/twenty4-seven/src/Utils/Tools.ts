/**
 * The `capitalizeWords` function takes a string as input, splits it into words, capitalizes the
 * first letter of each word, and then joins the words back together into a single string.
 * @param {string} str - A string that contains one or more words that you want to capitalize.
 * @returns The `capitalizeWords` function returns a string where each word in the input string `str`
 * is capitalized (the first letter of each word is converted to uppercase) and the words are then
 * joined back together with spaces.
 */
export const capitalizeWords = (str: string): string => {
  const words: string[] = str.split(" ");
  const capitalizedWords: string[] = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};

/**
 * The function `getPastilColor` takes a status string as input and returns a corresponding color code
 * based on the status.
 * @param {string} status - The `status` parameter is a string that represents the current status of an
 * order. It can have one of the following values: "pending", "shipped", "delivered", or "cancelled".
 * @returns The `getPastilColor` function returns a string representing the background color based on
 * the input `status`. The returned string is a Tailwind CSS class that corresponds to a specific
 * color.
 */
export const getPastilColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "bg-[#F2B828]"; //? Yellow
    case "shipped":
      return "bg-[#288AF2]"; //? Blue
    case "delivered":
      return "bg-[#37F228]"; //? Green
    case "cancelled":
      return "bg-[#F22828]"; //? Red
    default:
      return "bg-gray-500"; //? Gray
  }
};

/**
 * The function `getTimelineColor` takes a status string as input and returns a corresponding color
 * class based on the status.
 * @param {string} status - The `getTimelineColor` function takes a `status` parameter, which is a
 * string representing the status of a timeline event. The function then returns a corresponding color
 * class based on the status provided.
 * @returns The function `getTimelineColor` returns a string representing the background color class
 * based on the input `status`.
 */
//! changer la logic, pour le moment c'est du fake
export const getTimelineColor = (status: string): string => {
  switch (status) {
    case "pending":
    case "in transit":
      return "bg-yellow-400"; //? Yellow
    case "shipped":
    case "out for delivery":
    case "package booked":
      return "bg-blue-500"; //? Blue
    case "delivered":
      return "bg-green-500"; //? Green
    case "cancelled":
      return "bg-red-500"; //? Red
    default:
      return "bg-gray-400"; //? Gray
  }
}
