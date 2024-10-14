-module(cw).
-export([find_patterns/2]).

find_pattern([], [], _Start, _End) -> [];
find_pattern([], _SubStr, _Start, _End) -> [];
find_pattern(_Str, [], _Start, _End) -> [];
find_pattern(Str, SubStr, Start, End) -> 
	Len1 = list_size(lists:sublist(Str, Start, End)), 
	Len2 = list_size(SubStr),
	Same = same_string(lists:sublist(Str, Start, Len2), SubStr),

	if
		Len1 < Len2 -> []; % Base Case
		Same -> [Start - 1|find_pattern(Str, SubStr, Start + 1, End)];
		true -> find_pattern(Str, SubStr, Start + 1, End)
	end.

find_pattern(Str, SubStr) -> find_pattern(Str, SubStr, 1, list_size(Str)).
same_string(String1, String2) -> String1 == String2.

list_size([]) -> 0;
list_size([_H | T]) -> 1 + list_size(T).

find_patterns(_Str, []) -> [];
find_patterns(Str, [H|T]) ->
	[find_pattern(Str, H)|find_patterns(Str, T)].