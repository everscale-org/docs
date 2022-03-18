pragma ton-solidity >= 0.58.0;

interface IIndexBasis {
    function getInfo() external view responsible returns (address collection);
    function destruct(address gasReceiver) external;
}