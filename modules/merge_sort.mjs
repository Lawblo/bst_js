export function merge_sort (arr) {
    if (arr.length == 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    let left = merge_sort(arr.slice(0, mid));
    let right = merge_sort(arr.slice(mid, arr.length));
    let temp_arr = [];

    while (left.length || right.length) {
        if (!left.length) {
            temp_arr = temp_arr.concat(right);
            return temp_arr;
        } else if (!right.length) {
            temp_arr = temp_arr.concat(left);
            return temp_arr;
        } else {
            left[0] < right[0]
                ? temp_arr.push(left.shift())
                : temp_arr.push(right.shift());
        }
    }
    return temp_arr;
}


