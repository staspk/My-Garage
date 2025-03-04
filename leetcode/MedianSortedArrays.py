

from typing import List



class Solution:

    # def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:



    # My first LeetCode Hard pass: 3/4/2025
    def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
        nums3: List[int] = []
        nums1_max, nums2_max = len(nums1), len(nums2)
        ptr1, ptr2, ptr3 = 0, 0, 0

        while(ptr1 < nums1_max and ptr2 < nums2_max):
            if nums1[ptr1] is None or nums2[ptr2] is None:
                break

            if nums1[ptr1] <= nums2[ptr2]:
                nums3.append(nums1[ptr1])
                ptr1 += 1
            else:
                nums3.append(nums2[ptr2])
                ptr2 += 1
            ptr3 += 1

        while(ptr1 < nums1_max):
            nums3.append(nums1[ptr1])
            ptr1 += 1
            ptr3 += 1

        while(ptr2 < nums2_max):
            nums3.append(nums2[ptr2])
            ptr2 += 1
            ptr3 += 1

        if ptr3 == 0:
            return 0

        if ptr3 == 1:
            return nums3[0]

        if ptr3 == 2:
            return (nums3[0] + nums3[1]) / 2
        
        if ptr3 % 2 == 0:
            pos1 = (int)(ptr3 / 2)
            pos2 = (int)(pos1 - 1)
            return (nums3[pos2] + nums3[pos1]) / 2

        return nums3[(int)(ptr3 / 2)]
            






nums1 = [1,3]
nums2 = [2]
assert Solution.findMedianSortedArrays(nums1, nums2) == 2.00000 


nums1 = [1,2]
nums2 = [3,4]
assert Solution.findMedianSortedArrays(nums1, nums2) == 2.50000
